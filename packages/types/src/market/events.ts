import { MarketEventType } from "../strategy-runner/context.js";
import { ICandlestick, IOrderbook, ITicker, ITrade } from "../exchange/index.js";
import { MarketId } from "./common.js";

export type CandleClosedMarketEvent = {
  type: typeof MarketEventType.onCandleClosed;
  marketId: MarketId;
  candle: ICandlestick; // current closed candle
  candles: ICandlestick[]; // previous candles history
};

export type PublicTradeMarketEvent = {
  type: typeof MarketEventType.onPublicTrade;
  marketId: MarketId;
  isDemoMarket: boolean;
  trade: ITrade;
};

export type OrderbookChangeMarketEvent = {
  type: typeof MarketEventType.onOrderbookChange;
  marketId: MarketId;
  isDemoMarket: boolean;
  orderbook: IOrderbook;
};

export type TickerChangeMarketEvent = {
  type: typeof MarketEventType.onTickerChange;
  marketId: MarketId;
  isDemoMarket: boolean;
  ticker: ITicker;
};

export type MarketEvent =
  | CandleClosedMarketEvent
  | PublicTradeMarketEvent
  | OrderbookChangeMarketEvent
  | TickerChangeMarketEvent;
