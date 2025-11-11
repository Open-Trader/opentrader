import { CreateTrade, IStore } from "@opentrader/bot-processor";
import { xprisma } from "@opentrader/db";
import { exchangeProvider } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { XOrderStatus, XTakeProfitType } from "@opentrader/types";
import { eventBus } from "@opentrader/event-bus";
import { OrderNormalizer, SmartTradeNormalizer } from "./normalizer.js";

export class BotStoreAdapter implements IStore {
  constructor(private stopBotFn: (botId: number) => Promise<void>) {}

  stopBot(botId: number): Promise<void> {
    return this.stopBotFn(botId);
  }

  async getSmartTrade(ref: string, botId: number) {
    const smartTrade = await xprisma.smartTrade.findFirst({
      where: { bot: { id: botId }, ref },
      include: {
        orders: true,
        exchangeAccount: true,
      },
    });

    return smartTrade ? SmartTradeNormalizer.normalize(smartTrade, { ref }) : null;
  }

  async createSmartTrade(ref: string, payload: CreateTrade, botId: number) {
    const bot = await xprisma.bot.findUnique({ where: { id: botId } });
    if (!bot) {
      logger.error(
        `BotStoreAdapter: Cannot cancel SmartTrade with ref "${ref}". Reason: Bot with ID ${botId} not found.`,
      );

      throw new Error("Bot not found");
    }

    const [, trade] = await xprisma.$transaction([
      // Clear previous trade ref (e.g., when calling `SmartTrade.replace()`)
      xprisma.smartTrade.updateMany({
        where: { botId, ref },
        data: { ref: null },
      }),
      xprisma.smartTrade.create({
        data: SmartTradeNormalizer.fromPayload(payload, bot, ref),
        include: {
          orders: true,
          exchangeAccount: true,
        },
      }),
    ]);

    logger.debug(`BotStoreAdapter: SmartTrade with ref "${ref}" created`);

    return SmartTradeNormalizer.normalize(trade, { ref });
  }

  async updateSmartTrade(ref: string, payload: Pick<CreateTrade, "tp">, botId: number) {
    if (!payload.tp) {
      logger.error(
        `BotStoreAdapter: Cannot update SmartTrade with ref "${ref}". Reason: "payload.sell" not provided. Payload: ${JSON.stringify(payload)}}`,
      );
      return null;
    }

    const bot = await xprisma.bot.findUnique({ where: { id: botId } });
    if (!bot) {
      logger.error(
        `BotStoreAdapter: Cannot cancel SmartTrade with ref "${ref}". Reason: Bot with ID ${botId} not found.`,
      );
      return null;
    }

    try {
      let trade = await xprisma.smartTrade.findFirstOrThrow({
        where: { bot: { id: bot.id }, ref },
        include: { orders: true, exchangeAccount: true },
      });
      const entryOrder = trade.orders.find((order) => order.entityType === "EntryOrder");

      if (!entryOrder) {
        throw new Error("EntryOrder not found in SmartTrade");
      }

      const tpOrder = trade.orders.find((order) => order.entityType === "TakeProfitOrder");
      if (tpOrder) {
        logger.debug(`BotStoreAdapter: Updating SmartTrade with "${ref}". TakeProfitOrder already exists. Skipping.`);

        return SmartTradeNormalizer.normalize(trade, { ref });
      }

      const symbol = payload.tp.symbol || bot.symbol;
      const exchangeAccountId = payload.tp.exchangeAccountId || bot.exchangeAccountId;

      const tp = OrderNormalizer.fromPayload(
        {
          ...payload.tp,
        },
        { entityType: "TakeProfitOrder", symbol, exchangeAccountId },
      );

      [, trade] = await xprisma.$transaction([
        // Create TP order and link to exist Trade
        xprisma.order.create({
          data: {
            ...tp,
            smartTradeId: trade.id,
            exchangeAccountId: exchangeAccountId,
          },
        }),
        // Update `takeProfitType` of the Trade
        xprisma.smartTrade.update({
          where: { id: trade.id },
          data: { takeProfitType: XTakeProfitType.Order }, // "None" → "Order"
          include: { orders: true, exchangeAccount: true },
        }),
      ]);

      logger.debug(`BotStoreAdapter: SmartTrade with ref "${ref}" updated. TakeProfitOrder placed.`);

      return SmartTradeNormalizer.normalize(trade, { ref });
    } catch (err) {
      console.log("An error occurred while updating SmartTrade", err);
      return null; // return null if smartTrade not found
    }
  }

  async cancelSmartTrade(ref: string, botId: number) {
    const bot = await xprisma.bot.findUnique({ where: { id: botId } });
    if (!bot) {
      logger.error(
        `BotStoreAdapter: Cannot cancel SmartTrade with ref "${ref}". Reason: Bot with ID ${botId} not found.`,
      );

      return false;
    }

    const smartTrade = await xprisma.smartTrade.findFirst({
      where: { ref, bot: { id: botId } },
      include: { orders: true, exchangeAccount: true },
    });
    if (!smartTrade) {
      logger.debug(`BotStoreAdapter: Cannot cancel SmartTrade with ref "${ref}". Reason: SmartTrade not found`);
      return false;
    }

    await eventBus.emit("cancelTrade", smartTrade);

    return true;
  }

  async getExchange(label: string) {
    const exchangeAccount = await xprisma.exchangeAccount.findFirst({ where: { label } });

    if (!exchangeAccount) {
      logger.error(`BotStoreAdapter: ExchangeAccount with label "${label}" not found`);
      return null;
    }

    return exchangeProvider.fromAccount(exchangeAccount);
  }

  async getOpenTrades(botId: number) {
    const trades = await xprisma.smartTrade.findMany({
      where: {
        ref: { not: null },
        bot: { id: botId },
        orders: {
          some: {
            status: { in: [XOrderStatus.Idle, XOrderStatus.Placed] },
          },
        },
      },
      include: {
        exchangeAccount: true,
        orders: true,
      },
    });

    return trades.map((trade) => SmartTradeNormalizer.normalize(trade, { ref: trade.ref! }));
  }
}
