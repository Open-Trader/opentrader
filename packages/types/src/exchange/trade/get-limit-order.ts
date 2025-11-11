export type IGetLimitOrderRequest = {
  /**
   * e.g. ADA/USDT
   */
  symbol: string;
  /**
   * Order ID provided by the exchange
   */
  orderId: string;
};

import type { OrderSide, OrderStatus } from "./common/enums.js";

export interface IGetLimitOrderResponse {
  /**
   * Exchange-supplied order ID.
   */
  exchangeOrderId: string;
  /**
   * Client-supplied order ID
   */
  clientOrderId?: string;
  symbol: string;
  side: OrderSide;
  /**
   * Quantity to buy or sell in baseCurrency.
   */
  quantity: number;
  /**
   * Quantity executed
   */
  quantityExecuted: number;
  /**
   * Volume in quoteCurrency.
   */
  volume: number;
  /**
   * Volume executed
   */
  volumeExecuted: number;
  /**
   * Order limit price. May be undefined for not filled market orders.
   */
  price: number;
  /**
   * Filled price.
   */
  filledPrice: number | null;
  /**
   * Unix timestamp of the most recent trade on this order.
   */
  lastTradeTimestamp: number;
  /**
   * Order status.
   */
  status: OrderStatus;
  /**
   * Order fee.
   */
  fee: number;
  /**
   * Creation time, Unix timestamp format in milliseconds, e.g. `1597026383085`
   */
  createdAt: number;
}
