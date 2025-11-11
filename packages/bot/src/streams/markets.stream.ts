import { EventEmitter } from "node:events";
import { TBotWithExchangeAccount } from "@opentrader/db";
import { findStrategy } from "@opentrader/bot-templates/server";
import { getWatchers } from "../processing/index.js";
import {
  CandleClosedMarketEvent,
  OrderbookChangeMarketEvent,
  PublicTradeMarketEvent,
  TickerChangeMarketEvent,
} from "@opentrader/types";
import { CandlesStream } from "./candles.stream.js";
import { OrderbookStream } from "./orderbook.stream.js";
import { TradesStream } from "./trades.stream.js";
import { TickerStream } from "./ticker.stream.js";
import { CandleEvent, OrderbookEvent, TradeEvent, TickerEvent } from "../channels/index.js";

/**
 * Emits:
 * - market: MarketEvent
 */
export class MarketsStream extends EventEmitter {
  private unsubscribeAll = () => {};

  candlesStream: CandlesStream;
  orderbookStream: OrderbookStream;
  tradesStream: TradesStream;
  tickerStream: TickerStream;

  constructor(bots: TBotWithExchangeAccount[]) {
    super();

    this.candlesStream = new CandlesStream(bots);
    this.orderbookStream = new OrderbookStream(bots);
    this.tradesStream = new TradesStream(bots);
    this.tickerStream = new TickerStream(bots);

    this.unsubscribeAll = this.subscribe();
  }

  async add(bot: TBotWithExchangeAccount) {
    const { strategyFn } = findStrategy(bot.template);
    const { watchTrades, watchOrderbook, watchTicker, watchCandles } = getWatchers(strategyFn, bot);

    if (watchCandles.length > 0) await this.candlesStream.addBot(bot);
    if (watchTrades.length > 0) await this.tradesStream.addBot(bot);
    if (watchOrderbook.length > 0) await this.orderbookStream.addBot(bot);
    if (watchTicker.length > 0) await this.tickerStream.addBot(bot);
  }

  private subscribe() {
    const handleCandle = ({ candle, history, marketId, isDemoMarket }: CandleEvent) => {
      this.emit("market", {
        type: "onCandleClosed",
        candle,
        candles: history,
        marketId,
        isDemoMarket,
      } satisfies CandleClosedMarketEvent);
    };
    this.candlesStream.on("candle", handleCandle);

    const handleTrade = ({ trade, marketId, isDemoMarket }: TradeEvent) => {
      this.emit("market", { type: "onPublicTrade", trade, marketId, isDemoMarket } satisfies PublicTradeMarketEvent);
    };
    this.tradesStream.on("trade", handleTrade);

    const handleOrderbook = ({ orderbook, marketId, isDemoMarket }: OrderbookEvent) => {
      this.emit("market", {
        type: "onOrderbookChange",
        orderbook,
        marketId,
        isDemoMarket,
      } satisfies OrderbookChangeMarketEvent);
    };
    this.orderbookStream.on("orderbook", handleOrderbook);

    const handleTicker = ({ ticker, marketId, isDemoMarket }: TickerEvent) => {
      this.emit("market", { type: "onTickerChange", ticker, marketId, isDemoMarket } satisfies TickerChangeMarketEvent);
    };
    this.tickerStream.on("ticker", handleTicker);

    return () => {
      this.candlesStream.off("candle", handleCandle);
      this.tradesStream.off("trade", handleTrade);
      this.orderbookStream.off("orderbook", handleOrderbook);
      this.tickerStream.off("ticker", handleTicker);
    };
  }

  async create() {
    await this.candlesStream.create();
    await this.orderbookStream.create();
    await this.tradesStream.create();
    await this.tickerStream.create();
  }

  async clean(bots: TBotWithExchangeAccount[]) {
    this.candlesStream.cleanStaleChannels(bots);
    this.orderbookStream.cleanStaleChannels(bots);
    this.tradesStream.cleanStaleChannels(bots);
    this.tickerStream.cleanStaleChannels(bots);
  }

  destroy() {
    this.unsubscribeAll();

    this.candlesStream.destroy();
    this.orderbookStream.destroy();
    this.tradesStream.destroy();
    this.tickerStream.destroy();
  }
}
