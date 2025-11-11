import { findStrategy, loadCustomStrategies } from "@opentrader/bot-templates/server";
import {
  xprisma,
  type ExchangeAccountWithCredentials,
  TBotWithExchangeAccount,
  SmartTradeWithOrders,
} from "@opentrader/db";
import { logger } from "@opentrader/logger";
import { exchangeProvider } from "@opentrader/exchanges";
import { BotProcessing } from "./processing/index.js";
import { eventBus } from "@opentrader/event-bus";
import { ExchangeCode, MarketEvent } from "@opentrader/types";
import { EventEmitter } from "node:events";
import { MarketsStream } from "./streams/markets.stream.js";
import { OrderEvent, OrdersStream } from "./streams/orders.stream.js";
import { BotManager } from "./bot.manager.js";
import { TradeManager } from "./trade.manager.js";

export class Platform {
  private ordersStream: OrdersStream;
  private marketStream: MarketsStream;
  private unsubscribeFromEventBus = () => {};
  private botManager: BotManager;
  private tradeManager: TradeManager;

  constructor(exchangeAccounts: ExchangeAccountWithCredentials[]) {
    EventEmitter.defaultMaxListeners = 0; // Disable Node.js max listeners warning

    this.ordersStream = new OrdersStream(exchangeAccounts);
    this.ordersStream.on("order", this.handleOrderEvent);

    this.marketStream = new MarketsStream([]);
    this.marketStream.on("market", this.handleMarketEvent);

    this.tradeManager = new TradeManager(this.ordersStream);
    this.botManager = new BotManager(this.ordersStream, this.marketStream, this.tradeManager);
  }

  async bootstrap() {
    const customStrategiesPath = process.env.CUSTOM_STRATEGIES_PATH;
    if (customStrategiesPath) await this.loadCustomStrategies(customStrategiesPath);

    await this.removeDeprecatedExchanges();
    await this.cleanOrphanedBots();
    await this.cleanOrphanedTrades();
    await this.ordersStream.create();
    await this.marketStream.create();

    this.unsubscribeFromEventBus = this.subscribeToEventBus();
  }

  async shutdown() {
    await this.botManager.stopAll();
    this.tradeManager.destroy();

    await this.ordersStream.destroy();
    this.marketStream.off("market", this.handleMarketEvent);
    this.marketStream.destroy();

    this.unsubscribeFromEventBus();
  }

  async removeDeprecatedExchanges() {
    const exchangeCodes = Object.values(ExchangeCode);

    const deprecatedExchanges = await xprisma.exchangeAccount.findMany({
      where: { exchangeCode: { notIn: exchangeCodes } },
    });

    if (deprecatedExchanges.length > 0) {
      logger.warn(`Some exchanges are not supported anymore. Removing exchange accounts…`);
      for (const exchangeAccount of deprecatedExchanges) {
        await xprisma.exchangeAccount.delete({ where: { id: exchangeAccount.id } });
        logger.warn(`Exchange account [${exchangeAccount.exchangeCode}] ${exchangeAccount.name} removed`);
      }
    }
  }

  /**
   * Stops enabled bots gracefully.
   * Does execute "stop" command on each bot, and then sets the bot status as disabled.
   */
  async stopEnabledBots() {
    const bots = await xprisma.bot.custom.findMany({
      where: { OR: [{ enabled: true }, { processing: true }] },
      include: { exchangeAccount: true },
    });
    if (bots.length === 0) return;
    logger.info(`[Processor] Stopping ${bots.length} bots gracefully…`);

    for (let bot of bots) {
      // Check if the strategy function exists
      // If not, just mark the bot as disabled
      try {
        findStrategy(bot.template);
      } catch (err) {
        logger.warn(
          `[Processor] Strategy "${bot.template}" not found. ` +
            "The strategy may have been removed, or the CUSTOM_STRATEGIES_PATH env is incorrect. " +
            `Marking the bot as disabled [Bot ID: ${bot.id}, Name: ${bot.name}]`,
        );

        await xprisma.bot.custom.update({
          where: { id: bot.id },
          data: { enabled: false, processing: false },
        });

        continue;
      }

      bot = await xprisma.bot.custom.update({
        where: { id: bot.id },
        data: { enabled: false, processing: false },
        include: { exchangeAccount: true },
      });

      const botProcessor = new BotProcessing(bot);
      await botProcessor.processStopCommand();

      logger.info(`[Processor] Bot stopped [id=${bot.id} name=${bot.name}]`);
    }
  }

  /**
   * When the app starts, check if there are any enabled bots and stop them gracefully.
   * This is necessary because the previous process might have been interrupted,
   * and there are open orders that need to be closed on the exchange.
   */
  async cleanOrphanedBots() {
    const anyBotEnabled = await xprisma.bot.custom.findFirst({
      where: { OR: [{ enabled: true }, { processing: true }] },
    });

    if (anyBotEnabled) {
      logger.warn(`[Processor] The previous process was interrupted, there are orphaned bots. Performing cleanup…`);
      await this.stopEnabledBots();
    }
  }

  /**
   * Cleans up trades left in an inconsistent state, e.g. from unexpected bot shutdowns.
   */
  async cleanOrphanedTrades() {
    const tradesCount = await xprisma.smartTrade.count({
      where: { ref: { not: null } },
    });

    if (tradesCount > 0) {
      logger.warn(
        `Found ${tradesCount} orphaned trades. This usually happens if the bot was stopped unexpectedly or crashed.`,
      );
      const result = await xprisma.smartTrade.updateMany({
        where: { ref: { not: null } },
        data: { ref: null },
      });

      logger.info(`Cleaned up ${result.count} orphaned trades.`);
    }
  }

  /**
   * Loads custom strategies from the specified directory.
   * @param fullPath Absolute path to the directory with custom strategies
   */
  async loadCustomStrategies(fullPath: string) {
    logger.info(`Loading custom strategies from dir: ${fullPath}`);
    const customStrategies = await loadCustomStrategies(fullPath);
    const customStrategiesCount = Object.keys(customStrategies).length;

    if (customStrategiesCount > 0) {
      logger.info(`Loaded ${customStrategiesCount} custom strategies`);
    } else {
      logger.warn("No custom strategies found");
    }
  }

  /**
   * Subscribes to event bus events:
   *
   * - When a bot started → Subscribe to candles channel
   * - When a bot stopped → Unsubscribe from candles channel
   * - When an exchange account was created → Start watching for orders status change (filled, canceled, etc)
   * - When an exchange account was deleted → Stop watching for orders
   * - When an exchange account was updated → Resubcribe to orders channel with new credentials
   */
  private subscribeToEventBus() {
    const onBeforeBotStarted = async (_data: TBotWithExchangeAccount) => {
      //
    };

    const startBot = async (bot: TBotWithExchangeAccount) => {
      await this.botManager.start(bot.id);
    };

    const onBotStarted = async (_data: TBotWithExchangeAccount) => {
      //
    };

    const stopBot = async (bot: TBotWithExchangeAccount) => {
      await this.botManager.stop(bot.id);
    };

    const onBeforeBotStopped = async (_data: TBotWithExchangeAccount) => {
      //
    };

    const onBotStopped = async (_bot: TBotWithExchangeAccount) => {
      //
    };

    const addExchangeAccount = async (exchangeAccount: ExchangeAccountWithCredentials) =>
      await this.ordersStream.addExchangeAccount(exchangeAccount);

    const removeExchangeAccount = async (exchangeAccount: ExchangeAccountWithCredentials) => {
      await this.ordersStream.removeExchangeAccount(exchangeAccount);
      exchangeProvider.removeByAccountId(exchangeAccount.id);
    };

    const updateExchangeAccount = async (exchangeAccount: ExchangeAccountWithCredentials) => {
      exchangeProvider.removeByAccountId(exchangeAccount.id);
      await this.ordersStream.updateExchangeAccount(exchangeAccount);
    };

    const onTradeCreated = async (trade: SmartTradeWithOrders) => {
      //
    };

    const onTradeCompleted = async (trade: SmartTradeWithOrders) => {
      //
    };

    eventBus.on("startBot", startBot);
    eventBus.on("onBeforeBotStarted", onBeforeBotStarted);
    eventBus.on("onBotStarted", onBotStarted);
    eventBus.on("stopBot", stopBot);
    eventBus.on("onBeforeBotStopped", onBeforeBotStopped);
    eventBus.on("onBotStopped", onBotStopped);
    eventBus.on("onExchangeAccountCreated", addExchangeAccount);
    eventBus.on("onExchangeAccountDeleted", removeExchangeAccount);
    eventBus.on("onExchangeAccountUpdated", updateExchangeAccount);
    eventBus.on("onTradeCreated", onTradeCreated);
    eventBus.on("onTradeCompleted", onTradeCompleted);

    // Return unsubscribe function
    return () => {
      eventBus.off("startBot", startBot);
      eventBus.off("onBeforeBotStarted", onBeforeBotStarted);
      eventBus.off("onBotStarted", onBotStarted);
      eventBus.off("stopBot", stopBot);
      eventBus.off("onBeforeBotStopped", onBeforeBotStopped);
      eventBus.off("onBotStopped", onBotStopped);
      eventBus.off("onExchangeAccountCreated", addExchangeAccount);
      eventBus.off("onExchangeAccountDeleted", removeExchangeAccount);
      eventBus.off("onExchangeAccountUpdated", updateExchangeAccount);
      eventBus.off("onTradeCreated", onTradeCreated);
      eventBus.off("onTradeCompleted", onTradeCompleted);
    };
  }

  handleMarketEvent = (event: MarketEvent) => {
    //
  };

  handleOrderEvent = async (_event: OrderEvent) => {
    //
  };
}

export async function bootstrapPlatform() {
  const exchangeAccounts = await xprisma.exchangeAccount.findMany();
  logger.info(`🏛️  Loaded ${exchangeAccounts.length} exchange account(s)`);

  const bot = await xprisma.bot.custom.findFirst({
    where: {
      label: "default",
    },
    include: { exchangeAccount: true },
  });
  logger.info(`🤖 Default bot: ${bot ? bot.label : "none"}`);

  const platform = new Platform(exchangeAccounts);

  await platform.bootstrap();

  return platform;
}
