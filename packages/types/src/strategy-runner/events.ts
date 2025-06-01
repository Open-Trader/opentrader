import { ICandlestick, IOrderbook, ITicker, ITrade } from "../exchange/index.js";
import { MarketId } from "../market/common.js";
import { StrategyEventType } from "./context.js";

type BaseStrategyEvent<T extends StrategyEventType> = {
  type: T;
  marketId: MarketId;
  isDemoMarket: boolean;
};

type PublicTradeEvent = BaseStrategyEvent<"onPublicTrade"> & {
  trade: ITrade;
};

type OrderbookEvent = BaseStrategyEvent<"onOrderbookChange"> & {
  orderbook: IOrderbook;
};

type TickerEvent = BaseStrategyEvent<"onTickerChange"> & {
  ticker: ITicker;
};

type CandleClosedEvent = BaseStrategyEvent<"onCandleClosed"> & {
  candle: ICandlestick;
  candles: ICandlestick[];
};

type OrderFilledEvent = BaseStrategyEvent<"onOrderFilled"> & {
  orderId: number;
};

type TradeCompletedEvent = BaseStrategyEvent<"onTradeCompleted"> & {
  tradeId: number;
};

type IntervalEvent = BaseStrategyEvent<"onInterval">;

export type StrategyEvent =
  | CandleClosedEvent
  | PublicTradeEvent
  | OrderbookEvent
  | TickerEvent
  | IntervalEvent
  | OrderFilledEvent
  | TradeCompletedEvent;
