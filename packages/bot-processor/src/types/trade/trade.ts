import { XSmartTradeType } from "@opentrader/types";
import { Order } from "./order.js";

interface BaseTrade<T extends XSmartTradeType> {
  id: number;
  ref: string;
  type: T;
  symbol: string;
  // exchangeAccount: null; // @todo
  createdAt: Date;
  updatedAt: Date;
  orders: Order[]; // includes all three: Entry, TP and SL orders
}

export interface SmartTrade extends BaseTrade<typeof XSmartTradeType.Trade> {
  entryOrder: Order;
  tpOrder?: Order;
  slOrder?: Order;
}

export interface DcaTrade extends BaseTrade<typeof XSmartTradeType.DCA> {
  entryOrder: Order;
  tpOrder: Order;
  slOrder?: Order;
  safetyOrders: Order[];
}

export interface ArbTrade extends BaseTrade<typeof XSmartTradeType.ARB> {
  entryOrder: Order;
  tpOrder: Order;
  slOrder?: Order;
}

export type Trade = SmartTrade | DcaTrade | ArbTrade;
