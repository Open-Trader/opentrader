import { XOrderStatus, XSmartTradeType } from "@opentrader/types";
import { cancelSmartTrade, replaceSmartTrade } from "../../effects/index.js";
import { Trade } from "../trade/index.js";

export class SmartTradeService {
  type: XSmartTradeType;
  entry: Trade["entryOrder"];
  tp: Trade["tpOrder"];
  sl: Trade["slOrder"];

  constructor(
    public ref: string,
    public smartTrade: Trade,
  ) {
    // Instead of assigning prop by prop
    // it is possible to use `Object.assign(this, smartTrade)`
    // but types are lost in this case
    this.type = smartTrade.type;
    this.entry = smartTrade.entryOrder;
    this.tp = smartTrade.tpOrder;
    this.sl = smartTrade.slOrder;
  }

  /**
   * Create a new SmartTrade with same buy/sell orders
   */
  replace() {
    return replaceSmartTrade(this.smartTrade, this.ref);
  }

  cancel() {
    return cancelSmartTrade(this.ref);
  }

  isCompleted(): boolean {
    const closedWithTakeProfit =
      this.smartTrade.entryOrder.status === XOrderStatus.Filled &&
      this.smartTrade.tpOrder?.status === XOrderStatus.Filled;
    const closedWithStopLoss =
      this.smartTrade.entryOrder.status === XOrderStatus.Filled &&
      this.smartTrade.slOrder?.status === XOrderStatus.Filled;

    return closedWithTakeProfit || closedWithStopLoss;
  }
}
