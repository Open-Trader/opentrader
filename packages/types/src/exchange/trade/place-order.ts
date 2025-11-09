import { XOrderType } from "../../common/index.js";
import type { OrderSide } from "./common/enums.js";

export interface IPlaceOrderRequest {
  /**
   * Order type: Limit | Market
   */
  type: XOrderType;
  /**
   * Instrument ID, e.g `BTC/USDT`.
   */
  symbol: string;
  /**
   * Client-supplied order ID
   */
  clientOrderId?: string;
  side: OrderSide;
  /**
   * Quantity to buy or sell.
   */
  quantity: number;
  /**
   * Some exchanges require price for Market orders to calculate the total cost of the order in the quote currency.
   * @see https://docs.ccxt.com/#/?id=market-buys
   */
  price?: number;
}

export interface IPlaceOrderResponse {
  /**
   * Order ID.
   */
  orderId: string;
  /**
   * Client-supplied order ID
   */
  clientOrderId?: string;
}
