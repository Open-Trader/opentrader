import type { BotState, IBotConfiguration } from "@opentrader/bot-processor";
import { createStrategyRunner } from "@opentrader/bot-processor";
import { findStrategy } from "@opentrader/bot-templates/server";
import { exchangeProvider } from "@opentrader/exchanges";
import type { TBotWithExchangeAccount } from "@opentrader/db";
import { xprisma } from "@opentrader/db";
import { logger } from "@opentrader/logger";
import {
  XOrderStatus,
  type ExchangeCode,
  type MarketData,
  type MarketId,
  type StrategyEventType,
} from "@opentrader/types";
import { BotStoreAdapter } from "./bot-store-adapter.js";

type StrategyRunContext = {
  triggerEventType?: StrategyEventType;
  market?: MarketData; // default market
  markets?: Record<MarketId, MarketData>; // additional markets
};

export class BotProcessing {
  constructor(private bot: TBotWithExchangeAccount) {}

  static async fromId(id: number) {
    const bot = await xprisma.bot.custom.findUniqueOrThrow({
      where: { id },
      include: { exchangeAccount: true },
    });

    return new BotProcessing(bot);
  }

  static async fromSmartTradeId(smartTradeId: number) {
    const bot = await xprisma.bot.custom.findFirstOrThrow({
      where: {
        smartTrades: {
          some: { id: smartTradeId },
        },
      },
      include: { exchangeAccount: true },
    });

    return new BotProcessing(bot);
  }

  /**
   * @deprecated
   * This function is triggered by the strategy function itself.
   * It was intended for cases where the strategy could no longer operate
   * (e.g. due to insufficient funds), allowing the bot to self-terminate.
   *
   * @todo Replace this with an EventBus-based flow by emitting a "stopBot" event,
   * so that the shutdown logic is properly handled by the Bot instance.
   */
  private async markBotAsStopped() {
    throw new Error("Stopping the bot from the strategy function is deprecated");

    this.bot = await xprisma.bot.custom.update({
      where: { id: this.bot.id },
      data: { enabled: false },
      include: { exchangeAccount: true },
    });
  }

  private async processCommand(command: "start" | "stop" | "process", params: StrategyRunContext) {
    const { triggerEventType, market, markets } = params;

    logger.debug(
      {
        context: `candle=${JSON.stringify(market?.candle)} candlesHistory=${market?.candles.length || 0} trade=${JSON.stringify(market?.trade)}`,
        bot: `id=${this.bot.id} name="${this.bot.name}"`,
      },
      `🤖 Exec "${command}" command`,
    );
    const t0 = Date.now();

    if (this.bot.processing) {
      console.warn(`Cannot execute "${command}()" command. The bot is busy right now by the previous processing job.`);
      return;
    }

    const strategyRunner = await this.createRunner();
    const botState = this.bot.state as BotState;

    await xprisma.bot.setProcessing(true, this.bot.id);
    try {
      if (command === "start") {
        await strategyRunner.start(botState);
      } else if (command === "stop") {
        await strategyRunner.stop(botState);
      } else if (command === "process") {
        await strategyRunner.process(botState, triggerEventType, market, markets);
      }
    } catch (err) {
      await xprisma.bot.setProcessing(false, this.bot.id);
      await xprisma.botLog.log({
        startedAt: new Date(t0),
        endedAt: new Date(),
        botId: this.bot.id,
        context: market,
        action: command,
        triggerEventType,
        error: {
          message: (err as Error).message,
          stack: (err as Error).stack,
        },
      });

      throw err;
    }

    await xprisma.bot.setProcessing(false, this.bot.id);
    await xprisma.bot.updateState(botState, this.bot.id);

    if (this.bot.logging) {
      await xprisma.botLog.log({
        startedAt: new Date(t0),
        endedAt: new Date(),
        botId: this.bot.id,
        context: market,
        action: command,
        triggerEventType,
      });
    }

    const t1 = Date.now();
    const duration = (t1 - t0) / 1000;

    logger.debug(
      {
        botId: this.bot.id,
        botName: this.bot.name,
      },
      `🤖 Exec "${command}" command finished in ${duration}s`,
    );
  }

  async processStartCommand() {
    await this.processCommand("start", {});
  }

  async processStopCommand() {
    await this.processCommand("stop", {});
  }

  async process(params: StrategyRunContext = {}) {
    await this.processCommand("process", params);
  }

  isBotRunning() {
    return this.bot.enabled;
  }

  isBotStopped() {
    return !this.bot.enabled;
  }

  getBot() {
    return this.bot;
  }

  getId() {
    return this.bot.id;
  }

  getTimeframe() {
    return this.bot.timeframe;
  }

  private async createRunner() {
    const exchangeAccount = await xprisma.exchangeAccount.findUniqueOrThrow({
      where: { id: this.bot.exchangeAccountId },
    });

    const additionalExchangeAccounts = await xprisma.exchangeAccount.findMany({
      where: {
        bots: { some: { id: this.bot.id } },
      },
    });

    const exchange = exchangeProvider.fromAccount(exchangeAccount);
    const additionalExchanges = additionalExchangeAccounts.map((exchangeAccount) =>
      exchangeProvider.fromAccount(exchangeAccount),
    );

    const configuration: IBotConfiguration = {
      id: this.bot.id,
      symbol: this.bot.symbol,
      settings: this.bot.settings,
      exchangeCode: exchangeAccount.exchangeCode as ExchangeCode,
    };

    const storeAdapter = new BotStoreAdapter(() => this.markBotAsStopped());
    const { strategyFn } = findStrategy(this.bot.template);

    const processor = createStrategyRunner({
      store: storeAdapter,
      exchange,
      additionalExchanges,
      botConfig: configuration,
      botTemplate: strategyFn,
    });

    return processor;
  }

  async getPendingSmartTrades() {
    const smartTrades = await xprisma.smartTrade.findMany({
      where: {
        ref: { not: null },
        orders: { some: { status: XOrderStatus.Idle } },
        bot: { id: this.bot.id },
      },
      include: {
        exchangeAccount: true,
        orders: true,
      },
    });

    return smartTrades;
  }
}
