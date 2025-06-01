import { CANCEL_ALL_TRADES } from "./types/index.js";
import { makeEffect } from "./utils/index.js";

export type CancelAllTradesResult = {
  /**
   * Number of open orders before operation.
   */
  total: number;
  /**
   * Number of sucessfully cancelled orders.
   */
  cancelled: number;
  /**
   * Number of orders failed to cancel.
   */
  failed: number;
};

export function cancelAllTrades() {
  return makeEffect(CANCEL_ALL_TRADES, undefined, undefined);
}
