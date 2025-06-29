import { SmartTradeWithOrders, xprisma } from "@opentrader/db";
import { eventBus } from "@opentrader/event-bus";
import { logger } from "@opentrader/logger";
import { OrdersStream } from "./streams/orders.stream.js";
import { Trade } from "./trade.js";

export class TradeManager {
  trades: Trade[] = [];

  constructor(private ordersStream: OrdersStream) {
    eventBus.on("placeTrade", this.handleTradePlacement);
    eventBus.on("onTradeCompleted", this.handleTradeCompleted);
    eventBus.on("cancelTrade", this.cancelTrade);
  }

  destroy() {
    eventBus.off("placeTrade", this.handleTradePlacement);
    eventBus.off("onTradeCompleted", this.handleTradeCompleted);
    eventBus.off("cancelTrade", this.cancelTrade);
  }

  private handleTradePlacement = async (trade: SmartTradeWithOrders) => {
    await this.place(trade.id);
  };

  private handleTradeCompleted = (trade: SmartTradeWithOrders) => {
    this.trades = this.trades.filter((t) => t.smartTrade.id !== trade.id);
    logger.info(`Trade with id ${trade.id} completed and has been removed from the trades list.`);
  };

  private cancelTrade = async (trade: SmartTradeWithOrders) => {
    await this.cancel(trade.id);
  };

  async place(id: number) {
    let trade: Trade;

    if (this.trades.some((t) => t.smartTrade.id === id)) {
      trade = this.trades.find((t) => t.smartTrade.id === id)!;
      await trade.next();
    } else {
      const data = await xprisma.smartTrade.findUniqueOrThrow({
        where: { id },
        include: { orders: true, exchangeAccount: true },
      });

      const trade = new Trade(data, this.ordersStream);
      try {
        await trade.place();
        logger.debug(`Placed with id ${trade.smartTrade.id} was placed on exchange.`);
        this.trades.push(trade);
      } catch (err) {
        logger.warn(
          `Failed to place order of ST ${trade.smartTrade.id} on exchange: ${(err as Error).name} ${(err as Error).message}`,
        );
        await trade.cancel();
      }
    }
  }

  async cancel(id: number) {
    const trade = this.trades.find((t) => t.smartTrade.id === id);

    if (!trade) {
      logger.debug(`[TradeManager] Trade with id ${id} does not exist. Nothing to cancel.`);
      return;
    }

    await trade.cancel();
    this.trades = this.trades.filter((t) => t.smartTrade.id !== id);
  }
}
