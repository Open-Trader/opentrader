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
  }

  destroy() {
    eventBus.off("placeTrade", this.handleTradePlacement);
    eventBus.off("onTradeCompleted", this.handleTradeCompleted);
  }

  private handleTradePlacement = async (trade: SmartTradeWithOrders) => {
    await this.place(trade.id);
  };

  private handleTradeCompleted = (trade: SmartTradeWithOrders) => {
    this.trades = this.trades.filter((t) => t.smartTrade.id !== trade.id);
    logger.info(`Trade with id ${trade.id} completed and has been removed from the trades list.`);
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
      await trade.place();
      logger.debug(`Placed with id ${trade.smartTrade.id} was placed on exchange.`);
      this.trades.push(trade);
    }
  }

  async cancel(id: number) {
    const trade = this.trades.find((t) => t.smartTrade.id === id);

    if (!trade) {
      throw new Error(`Trade with id ${id} does not exist. Nothing to cancel.`);
    }

    await trade.cancel();
    this.trades = this.trades.filter((t) => t.smartTrade.id !== id);
  }
}
