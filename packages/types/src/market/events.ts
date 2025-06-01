import { StrategyEventType } from "../strategy-runner/context.js";
import { ICandlestick, IOrderbook, ITicker, ITrade } from "../exchange/index.js";
import { MarketId } from "./common.js";

export type CandleClosedMarketEvent = {
  type: typeof StrategyEventType.onCandleClosed;
  marketId: MarketId;
  isDemoMarket: boolean;
  candle: ICandlestick; // current closed candle
  candles: ICandlestick[]; // previous candles history
};

export type PublicTradeMarketEvent = {
  type: typeof StrategyEventType.onPublicTrade;
  marketId: MarketId;
  isDemoMarket: boolean;
  trade: ITrade;
};

export type OrderbookChangeMarketEvent = {
  type: typeof StrategyEventType.onOrderbookChange;
  marketId: MarketId;
  isDemoMarket: boolean;
  orderbook: IOrderbook;
};

export type TickerChangeMarketEvent = {
  type: typeof StrategyEventType.onTickerChange;
  marketId: MarketId;
  isDemoMarket: boolean;
  ticker: ITicker;
};

export type MarketEvent =
  | CandleClosedMarketEvent
  | PublicTradeMarketEvent
  | OrderbookChangeMarketEvent
  | TickerChangeMarketEvent;
