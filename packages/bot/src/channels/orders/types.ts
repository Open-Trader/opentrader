import type { OrderWithSmartTrade } from "@opentrader/db";
import type { ExchangeCode, IWatchOrder } from "@opentrader/types";

export type OrderEventType = "onFilled" | "onCanceled" | "onPlaced";

export type Subscription = {
  event: OrderEventType;
  callback: (
    exchangeOrder: IWatchOrder,
    order: OrderWithSmartTrade,
    exchangeCode: ExchangeCode,
    isDemoMarket: boolean,
  ) => void;
};
