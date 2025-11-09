import { XOrderSide, XOrderStatus, XOrderType, XSmartTradeType } from "@opentrader/types";

export type CreateOrder = {
  /**
   * Exchange account ID where the order will be placed.
   */
  exchangeAccountId?: number;
  /**
   * Symbol to trade. If not provided, then the bot's default symbol will be used.
   */
  symbol?: string;
  type: XOrderType;
  status?: XOrderStatus; // default to Idle
  side: XOrderSide;
  stopPrice?: number;
  price?: number; // if undefined, then it's a market order
  quantity: number;
  /**
   * Price deviation relative to entry price.
   * If 0.1, the order will be placed as entryPrice + 10%
   * If -0.1, the order will be placed as entryPrice - 10%
   */
  relativePrice?: number;
};

export type CreateSmartTrade = {
  type: typeof XSmartTradeType.Trade;
  entry: CreateOrder;
  tp?: CreateOrder;
  sl?: CreateOrder;
};

export type CreateDcaTrade = {
  type: typeof XSmartTradeType.DCA;
  entry: CreateOrder;
  tp: CreateOrder;
  sl?: CreateOrder;
  safetyOrders: CreateOrder[];
};

export type CreateArbTrade = {
  type: typeof XSmartTradeType.ARB;
  entry: CreateOrder;
  tp: CreateOrder;
};

export type CreateTrade = CreateSmartTrade | CreateDcaTrade | CreateArbTrade;
