import { IStore, Order, CreateTrade, Trade } from "@opentrader/bot-processor";
import type { IExchange } from "@opentrader/exchanges";
import { XEntityType, XOrderSide, XOrderStatus, XOrderType } from "@opentrader/types";
import { uniqueId } from "lodash";
import type { MarketSimulator } from "../market-simulator.js";

export class MemoryStore implements IStore {
  /**
   * @internal
   */
  constructor(private marketSimulator: MarketSimulator) {}

  /**
   * @internal
   */
  getSmartTrades() {
    // Return only used smartTrades by the bot.
    // The smartTrade that doesn't contain a ref
    // was replaced by other smartTrade.
    const smartTrades = this.marketSimulator.smartTrades.filter((smartTrade) => !!smartTrade.ref);

    return [...smartTrades].sort((left, right) => {
      return (left.entryOrder?.price || 0) - (right.tpOrder?.price || 0);
    });
  }

  async stopBot() {
    return Promise.resolve();
  }

  async getSmartTrade(ref: string, _botId: number): Promise<Trade | null> {
    const smartTrade = this.marketSimulator.smartTrades.find((smartTrade) => smartTrade.ref === ref);

    return smartTrade || null;
  }

  async createSmartTrade(ref: string, payload: CreateTrade, _botId: number): Promise<Trade> {
    const candlestick = this.marketSimulator.currentCandle;

    const { type, entry, tp } = payload;
    if (type !== "Trade") throw new Error(`Trade with type ${type} is not supported in backtesting`);

    const createdAt = new Date(candlestick.timestamp);

    let buyOrder: Order;
    let sellOrder: Order | undefined = undefined;

    const entryOrderStatus = entry.status || XOrderStatus.Idle;

    if (entry.type === "Market") {
      switch (entryOrderStatus) {
        case "Filled":
          if (!entry.price) {
            throw new Error(`Bought "price" is required for sell only trades`);
          }
          buyOrder = {
            id: 0,
            exchangeAccountId: 0,
            entityType: XEntityType.EntryOrder,
            symbol: entry.symbol!,
            quantity: entry.quantity,
            quantityExecuted: entry.quantity,
            volume: entry.quantity * entry.price,
            volumeExecuted: entry.quantity * entry.price,
            side: XOrderSide.Buy,
            type: XOrderType.Market,
            price: undefined,
            filledPrice: entry.price,
            status: entryOrderStatus,
            createdAt,
            updatedAt: createdAt,
          };
          break;
        case "Placed":
          throw new Error('Marking TP order as "placed" is not supported');
        case "Idle":
          buyOrder = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.EntryOrder,
            symbol: entry.symbol!,
            quantity: entry.quantity,
            quantityExecuted: 0,
            volume: 0, // no filledPrice to calculate
            volumeExecuted: 0, // no filledPrice to calculate
            side: XOrderSide.Buy,
            type: XOrderType.Market,
            price: undefined,
            filledPrice: undefined,
            status: entryOrderStatus,
            createdAt,
            updatedAt: createdAt,
          };
          break;
        default:
          throw new Error("Invalid order status");
      }
    } else {
      // Limit
      if (!entry.price) {
        throw new Error(`"price" is required for Limit entry order`);
      }

      switch (entryOrderStatus) {
        case "Filled":
          buyOrder = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.EntryOrder,
            symbol: entry.symbol!,
            quantity: entry.quantity,
            quantityExecuted: entry.quantity,
            volume: entry.quantity * entry.price,
            volumeExecuted: entry.quantity * entry.price,
            side: XOrderSide.Buy,
            type: XOrderType.Limit,
            price: entry.price,
            filledPrice: entry.price,
            status: entryOrderStatus,
            createdAt,
            updatedAt: createdAt,
          };
          break;
        case "Placed":
          throw new Error('Marking TP order as "placed" is not supported');
        case "Idle":
          buyOrder = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.EntryOrder,
            symbol: entry.symbol!,
            quantity: entry.quantity,
            quantityExecuted: 0,
            volume: entry.quantity * entry.price,
            volumeExecuted: 0,
            side: XOrderSide.Buy,
            type: XOrderType.Limit,
            price: entry.price,
            filledPrice: undefined,
            status: entryOrderStatus,
            createdAt,
            updatedAt: createdAt,
          };
          break;
        default:
          throw new Error(`Invalid order status: ${entry.status}`);
      }
    }

    if (tp?.type === "Market") {
      const tpOrderStatus = tp.status || XOrderStatus.Idle;

      switch (tpOrderStatus) {
        case "Filled":
          throw new Error('Marking TP order as "filled" is not supported');
        case "Placed":
          throw new Error('Marking TP order as "placed" is not supported');
        case "Idle":
          sellOrder = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.TakeProfitOrder,
            symbol: tp.symbol!,
            quantity: tp.quantity,
            quantityExecuted: 0,
            volume: 0, // no filledPrice to calculate
            volumeExecuted: 0, // no filledPrice to calculate
            side: XOrderSide.Sell,
            type: XOrderType.Market,
            price: undefined,
            filledPrice: undefined,
            status: tpOrderStatus,
            createdAt,
            updatedAt: createdAt,
          };
          break;
        default:
          throw new Error(`Invalid order status: ${tp.status}`);
      }
    } else if (tp?.type === "Limit") {
      if (!tp.price) {
        throw new Error(`"price" is required for Limit tp orders`);
      }

      const tpOrderStatus = tp.status || XOrderStatus.Idle;

      switch (tpOrderStatus) {
        case "Filled":
          throw new Error('Marking TP order as "filled" is not supported');
        case "Placed":
          throw new Error('Marking TP order as "placed" is not supported');
        case "Idle":
          sellOrder = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.TakeProfitOrder,
            symbol: tp.symbol!,
            quantity: tp.quantity,
            quantityExecuted: 0,
            volume: entry.quantity * tp.price,
            volumeExecuted: 0,
            side: XOrderSide.Sell,
            type: XOrderType.Limit,
            price: tp.price,
            filledPrice: undefined,
            status: tpOrderStatus,
            createdAt,
            updatedAt: createdAt,
          };
          break;
        default:
          throw new Error(`Invalid order status: ${tp.status}`);
      }
    }

    const smartTrade: Trade = {
      id: new Date().getTime(),
      type,
      ref,
      entryOrder: buyOrder,
      tpOrder: sellOrder,
      orders: [buyOrder, sellOrder].filter((order) => !!order),
      symbol: buyOrder.symbol,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.marketSimulator.addSmartTrade(smartTrade, ref);

    return smartTrade;
  }

  async updateSmartTrade(ref: string, payload: Pick<CreateTrade, "tp">, botId: number) {
    if (!payload.tp) {
      console.log("MemoryStore: Unable to update smart trade. Reason: `payload.sell` not provided.");
      return null;
    }

    const smartTrade = await this.getSmartTrade(ref, botId);

    if (!smartTrade) {
      return null;
    }

    const candlestick = this.marketSimulator.currentCandle;
    const updatedAt = new Date(candlestick.timestamp);

    if (smartTrade.tpOrder) {
      console.log("MemoryStore: SmartTrade already has a sell order. Skipping.");
      return smartTrade;
    }

    const orderStatus = payload.tp.status || XOrderStatus.Idle;

    let order: Order;

    if (payload.tp.type === XOrderType.Market) {
      switch (orderStatus) {
        case "Filled":
          throw new Error('Marking TP order as "filled" is not supported');
        case "Placed":
          throw new Error('Marking TP order as "placed" is not supported');
        case "Idle":
          order = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.TakeProfitOrder,
            symbol: payload.tp.symbol!,
            quantity: payload.tp.quantity,
            quantityExecuted: 0,
            volume: 0, // no filledPrice to calculate
            volumeExecuted: 0, // no filledPrice to calculate
            side: XOrderSide.Sell,
            type: XOrderType.Market,
            price: undefined,
            filledPrice: undefined,
            status: orderStatus,
            createdAt: updatedAt,
            updatedAt,
          };
          break;
        default:
          throw new Error("Invalid order status");
      }
    } else {
      // Limit
      if (!payload.tp.price) {
        throw new Error(`"price" is required for Limit tp orders`);
      }

      switch (orderStatus) {
        case "Filled":
          throw new Error('Marking TP order as "filled" is not supported');
        case "Placed":
          throw new Error('Marking TP order as "placed" is not supported');
        case "Idle":
          order = {
            id: new Date().getTime(),
            exchangeAccountId: new Date().getTime(),
            entityType: XEntityType.TakeProfitOrder,
            symbol: payload.tp.symbol!,
            quantity: payload.tp.quantity,
            quantityExecuted: 0,
            volume: payload.tp.quantity * payload.tp.price,
            volumeExecuted: 0,
            side: XOrderSide.Sell,
            type: XOrderType.Limit,
            price: payload.tp.price,
            filledPrice: undefined,
            status: XOrderStatus.Idle,
            createdAt: updatedAt,
            updatedAt,
          };
          break;
        default:
          throw new Error("Invalid order status");
      }
    }

    const newSmartTrade: Trade = {
      ...smartTrade,
      tpOrder: order,
    };

    this.marketSimulator.editSmartTrade(newSmartTrade, ref);

    return newSmartTrade;
  }

  async cancelSmartTrade(_ref: string, _botId: number) {
    return false; // @todo
    // throw new Error("Not implemented yet.");
  }

  async getOpenTrades() {
    return this.marketSimulator.smartTrades.filter(
      (trade) =>
        trade.entryOrder.status === "Idle" ||
        trade.entryOrder.status === "Placed" ||
        trade.tpOrder?.status === "Idle" ||
        trade.tpOrder?.status === "Placed",
    );
  }

  async getExchange(_label: string): Promise<IExchange | null> {
    throw new Error("Not implemented yet.");
  }
}
