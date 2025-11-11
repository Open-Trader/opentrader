import { xprisma } from "@opentrader/db";
import type { SmartTradeWithOrders, ExchangeAccountWithCredentials } from "@opentrader/db";
import type { IExchange } from "@opentrader/exchanges";
import { exchangeProvider } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { ITicker, XEntityType } from "@opentrader/types";
import type { ISmartTradeExecutor, SmartTradeContext } from "../smart-trade-executor.interface.js";
import { OrderExecutor } from "../order/order.executor.js";
import { decomposeSymbol } from "@opentrader/tools";

export class TradeExecutor implements ISmartTradeExecutor {
  smartTrade: SmartTradeWithOrders;
  exchange: IExchange;

  constructor(smartTrade: SmartTradeWithOrders, exchange: IExchange) {
    this.smartTrade = smartTrade;
    this.exchange = exchange;
  }

  static create(smartTrade: SmartTradeWithOrders, exchangeAccount: ExchangeAccountWithCredentials) {
    const exchange = exchangeProvider.fromAccount(exchangeAccount);

    return new TradeExecutor(smartTrade, exchange);
  }

  static async fromId(id: number) {
    const smartTrade = await xprisma.smartTrade.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        orders: true,
        exchangeAccount: true,
      },
    });

    const exchange = exchangeProvider.fromAccount(smartTrade.exchangeAccount);

    return new TradeExecutor(smartTrade, exchange);
  }

  static async fromOrderId(orderId: number) {
    const order = await xprisma.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
      include: {
        smartTrade: {
          include: {
            orders: true,
            exchangeAccount: true,
          },
        },
      },
    });

    const exchange = exchangeProvider.fromAccount(order.smartTrade.exchangeAccount);

    return new TradeExecutor(order.smartTrade, exchange);
  }

  static async fromExchangeOrderId(exchangeOrderId: string) {
    const order = await xprisma.order.findFirstOrThrow({
      where: {
        exchangeOrderId,
      },
      include: {
        smartTrade: {
          include: {
            orders: true,
            exchangeAccount: true,
          },
        },
      },
    });

    const exchange = exchangeProvider.fromAccount(order.smartTrade.exchangeAccount);

    return new TradeExecutor(order.smartTrade, exchange);
  }

  /**
   * Places the entry order and take profit order on the exchange.
   * Returns `true` if the order was placed successfully.
   */
  async next(market?: SmartTradeContext) {
    const entryOrder = this.smartTrade.orders.find((order) => order.entityType === "EntryOrder")!;
    const takeProfitOrder = this.smartTrade.orders.find((order) => order.entityType === "TakeProfitOrder");
    const stopLossOrder = this.smartTrade.orders.find((order) => order.entityType === XEntityType.StopLossOrder);
    const { baseCurrency, quoteCurrency } = decomposeSymbol(this.smartTrade.symbol);

    if (entryOrder.status === "Idle") {
      const orderExecutor = new OrderExecutor(entryOrder, this.exchange, this.smartTrade.symbol);
      await orderExecutor.place();
      await this.pull();

      const quoteLogValue = entryOrder.price ? entryOrder.quantity * entryOrder.price : "?";
      const priceLogValue = entryOrder.price ? entryOrder.price : "Market";
      logger.info(
        `[TradeExecutor] Placed entry ${entryOrder.side} ${entryOrder.quantity} ${baseCurrency} for ${quoteLogValue} ${quoteCurrency} at ${priceLogValue}`,
      );

      return true;
    } else if (entryOrder.status === "Filled" && takeProfitOrder?.status === "Idle") {
      const orderExecutor = new OrderExecutor(takeProfitOrder, this.exchange, this.smartTrade.symbol);
      await orderExecutor.place();
      await this.pull();

      const quoteLogValue = takeProfitOrder.price ? takeProfitOrder.quantity * takeProfitOrder.price : "?";
      const priceLogValue = takeProfitOrder.price ? takeProfitOrder.price : "Market";
      logger.info(
        `[TradeExecutor] Placed take profit ${takeProfitOrder.side} ${takeProfitOrder.quantity} ${baseCurrency} for ${quoteLogValue} ${quoteCurrency} at ${priceLogValue}`,
      );

      return true;
    }

    const stopLossActivated =
      market?.ticker && stopLossOrder?.stopPrice ? market.ticker.bid <= stopLossOrder.stopPrice : false;
    if (
      entryOrder.status === "Filled" &&
      takeProfitOrder?.status === "Placed" &&
      stopLossOrder?.status === "Idle" &&
      stopLossActivated
    ) {
      // Cancel TP
      const tpOrder = new OrderExecutor(takeProfitOrder, this.exchange, this.smartTrade.symbol);
      await tpOrder.cancel();

      // Place SL
      const slOrder = new OrderExecutor(stopLossOrder, this.exchange, this.smartTrade.symbol);
      await slOrder.place();

      await this.pull();

      const quoteLogValue = stopLossOrder.price ? stopLossOrder.quantity * stopLossOrder.price : "?";
      const priceLogValue = stopLossOrder.price ? stopLossOrder.price : "Market";
      logger.info(
        `[TradeExecutor] Placed stop loss ${stopLossOrder.side} ${stopLossOrder.quantity} ${baseCurrency} for ${quoteLogValue} ${quoteCurrency} at ${priceLogValue}`,
      );

      return true;
    }

    return false;
  }

  async onOrderFilled() {
    return this.next();
  }

  async onTicker(ticker: ITicker) {
    await this.next({ ticker });
  }

  /**
   * Cancel all orders linked to the smart trade.
   * Return number of cancelled orders.
   */
  async cancelOrders(): Promise<number> {
    const allOrders = [];

    for (const order of this.smartTrade.orders) {
      const orderExecutor = new OrderExecutor(order, this.exchange, this.smartTrade.symbol);

      const cancelled = await orderExecutor.cancel();
      allOrders.push(cancelled);
    }

    await xprisma.smartTrade.clearRef(this.smartTrade.id);
    await this.pull();

    const cancelledOrders = allOrders.filter((cancelled) => cancelled);
    logger.info(
      `[TradeExecutor] Cancelled ${cancelledOrders.length} of ${allOrders.length} orders of [ST - ${this.smartTrade.ref}].`,
    );

    return cancelledOrders.length;
  }

  get status(): "Entering" | "Exiting" | "Finished" {
    const entryOrder = this.smartTrade.orders.find((order) => order.entityType === "EntryOrder")!;
    const takeProfitOrder = this.smartTrade.orders.find((order) => order.entityType === "TakeProfitOrder");
    const stopLossOrder = this.smartTrade.orders.find((order) => order.entityType === XEntityType.StopLossOrder);

    if (entryOrder.status === "Idle" || entryOrder.status === "Placed") {
      return "Entering";
    }

    if (
      entryOrder.status === "Filled" &&
      (!takeProfitOrder || takeProfitOrder.status === "Filled") &&
      (!stopLossOrder || stopLossOrder.status === "Filled")
    ) {
      return "Finished";
    }

    return "Exiting";
  }

  /**
   * Pulls the order from the database to update the status.
   * Call directly only for testing.
   */
  async pull() {
    this.smartTrade = await xprisma.smartTrade.findUniqueOrThrow({
      where: {
        id: this.smartTrade.id,
      },
      include: {
        orders: true,
        exchangeAccount: true,
      },
    });
  }
}
