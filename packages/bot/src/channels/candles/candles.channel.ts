import { EventEmitter } from "node:events";
import { ExchangeClosedByUser, NetworkError, RequestTimeout } from "ccxt";
import type { IExchange } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { barSizeToDuration } from "@opentrader/tools";
import { BarSize, ICandlestick } from "@opentrader/types";

/**
 * Channel that subscribes to 1m candles from a specific exchange
 * and aggregates them into higher timeframes.
 *
 * Emits:
 * - candle: `CandleEvent`
 *
 * @example
 * ```ts
 * const exchange = exchangeProvider.fromCode(ExchangeCode.OKX);
 *
 * const channel = new CandlesChannel(symbol, timeframe, exchange);
 *
 * channel.on("candle", (candle, history) => {
 *   logger.info(candle, "Candle received");
 * });
 * ```
 */
export class CandlesChannel extends EventEmitter {
  public readonly symbol: string;
  public readonly timeframe: BarSize;
  private readonly exchange: IExchange;
  private readonly bucketSize: number;

  private enabled = false;
  private bucket: ICandlestick[] = [];
  private candlesHistory: ICandlestick[] = [];

  constructor(symbol: string, timeframe: BarSize, exchange: IExchange) {
    super();
    this.symbol = symbol;
    this.timeframe = timeframe;
    this.exchange = exchange;
    this.bucketSize = barSizeToDuration(timeframe) / 60000;
  }

  async init(requiredHistory?: number) {
    if (!this.enabled) {
      await this.downloadLastCandle();
    }
    if (requiredHistory) {
      await this.warmup(requiredHistory);
    }
  }

  start() {
    if (this.enabled) return;
    this.enabled = true;
    this.watchCandles();
  }

  stop() {
    this.enabled = false;
  }

  private async watchCandles() {
    while (this.enabled) {
      try {
        const candles = await this.exchange.watchCandles({ symbol: this.symbol });
        for (const candle of candles) {
          this.handleCandle(candle);
        }
      } catch (err) {
        if (err instanceof NetworkError || err instanceof RequestTimeout) {
          logger.warn(
            `[CandlesChannel] ${err.name} occurred in ${this.exchange.exchangeCode}:${this.symbol}:  ${err.message}. Reconnecting in 3s…`,
          );
          await new Promise((resolve) => setTimeout(resolve, 3000)); // prevents infinite loop
        } else if (err instanceof ExchangeClosedByUser) {
          logger.info(`[CandlesChannel] ExchangeClosedByUser: ${this.exchange.exchangeCode}:${this.symbol}`); // expected error when shutting down the platform

          this.stop();
          break;
        } else {
          logger.error(
            err,
            `[CandlesChannel] Unhandled error occurred in ${this.exchange.exchangeCode}:${this.symbol}. Watcher stopped.`,
          );

          this.stop();
          break;
        }
      }
    }
  }

  private handleCandle(candle: ICandlestick) {
    if (!this.enabled) return;

    const lastCandle = this.bucket[this.bucket.length - 1];
    if (candle.timestamp < lastCandle?.timestamp) return;

    if (candle.timestamp === lastCandle?.timestamp) {
      lastCandle.open = candle.open;
      lastCandle.high = Math.max(candle.high, lastCandle.high);
      lastCandle.low = Math.min(candle.low, lastCandle.low);
      lastCandle.close = candle.close;
      return;
    }

    if (lastCandle && candle.timestamp !== lastCandle.timestamp + 60000) {
      this.fillGaps(lastCandle, candle);
    }

    this.bucket.push(candle);
    this.aggregateIfReady();
  }

  private aggregateIfReady() {
    if (this.bucket.length >= this.bucketSize + 1) {
      const candle = this.aggregate();
      this.candlesHistory.push(candle);
      this.emit("candle", candle, this.candlesHistory);
    }
  }

  private aggregate(): ICandlestick {
    const candles = this.bucket.splice(0, this.bucketSize);
    return {
      open: candles[0].open,
      high: Math.max(...candles.map((c) => c.high)),
      low: Math.min(...candles.map((c) => c.low)),
      close: candles[candles.length - 1].close,
      timestamp: candles[0].timestamp,
      volume: candles.reduce((acc, c) => acc + c.volume, 0),
    };
  }

  /**
   * Fills the gaps in the bucked with the last known candle data.
   * @param startCandle Last candle in the bucket before the gap.
   * @param endCandle Last candle received from the exchange.
   */
  private fillGaps(startCandle: ICandlestick, endCandle: ICandlestick) {
    for (let timestamp = startCandle.timestamp + 60000; timestamp < endCandle.timestamp; timestamp += 60000) {
      this.bucket.push({
        timestamp,
        open: startCandle.close,
        high: startCandle.close,
        low: startCandle.close,
        close: startCandle.close,
        volume: 0,
      });
    }
    logger.warn(
      "[CandlesChannel] Filled gaps in the bucket between" +
        ` ${new Date(startCandle.timestamp).toDateString()} and ${new Date(endCandle.timestamp).toDateString()}` +
        ` for ${this.exchange.exchangeCode}:${this.symbol}`,
    );
  }

  /**
   * Downloads the last closed candle from the exchange.
   * E.g. if timeframe is set to 1d, it will download all the 1-minute candles
   * from the previous day and aggregate them into a single 1-day candle.
   */
  private async downloadLastCandle() {
    let since = getLastClosedCandleTimestamp(this.bucketSize);
    let minuteCandles: ICandlestick[] = [];
    let done = false;

    logger.debug(
      `[${this.symbol}#${this.timeframe}] Fetching the lastest closed candle since ${new Date(since).toISOString()}.`,
    );

    while (!done) {
      const candles = await this.exchange.getCandlesticks({
        symbol: this.symbol,
        bar: BarSize.ONE_MINUTE,
        since,
      });
      logger.debug(
        `[${this.symbol}#${this.timeframe}] Fetched ${candles.length} candle(s) since ${new Date(since).toISOString()}.`,
      );

      if (candles.length === 0) {
        done = true;
        continue;
      }

      minuteCandles = minuteCandles.concat(candles);

      since = candles[candles.length - 1].timestamp + 60000;
    }
    logger.debug(
      `[${this.symbol}#${this.timeframe}] Fetched in total ${minuteCandles.length} candles since ${new Date(since).toISOString()}`,
    );

    this.bucket = minuteCandles;
    while (this.bucket.length >= this.bucketSize + 1) {
      const candle = this.aggregate();
      this.candlesHistory.push(candle);
    }
  }

  private async warmup(requiredHistory: number) {
    if (this.candlesHistory.length >= requiredHistory) return;

    const historyCandle = this.candlesHistory[this.candlesHistory.length - 1];
    const since = historyCandle.timestamp - 60000 * this.bucketSize * requiredHistory;
    let minuteCandles: ICandlestick[] = [];
    let cursor = since;

    while (cursor <= historyCandle.timestamp) {
      const candles = await this.exchange.getCandlesticks({
        symbol: this.symbol,
        bar: BarSize.ONE_MINUTE,
        since: cursor,
      });

      if (candles.length === 0) break;

      minuteCandles = minuteCandles.concat(candles);
      cursor = candles[candles.length - 1].timestamp + 60000;
    }

    minuteCandles = minuteCandles.filter((candle) => candle.timestamp < historyCandle.timestamp);

    const aggregatedCandles: ICandlestick[] = [];
    while (minuteCandles.length >= this.bucketSize) {
      const candles = minuteCandles.splice(0, this.bucketSize);
      const candle = aggregateCandles(candles);
      aggregatedCandles.push(candle);
    }
    this.candlesHistory = [...aggregatedCandles, ...this.candlesHistory];

    const firstCandle = aggregatedCandles[0];
    const lastCandle = aggregatedCandles[aggregatedCandles.length - 1];
    logger.info(
      `[${this.symbol}#${this.timeframe}] Warming up completed. Aggregated ${aggregatedCandles.length} candles from ${firstCandle ? new Date(firstCandle.timestamp).toISOString() : null} to ${lastCandle ? new Date(lastCandle.timestamp).toISOString() : null}`,
    );
  }

  get isDemoAccount() {
    return this.exchange.isDemo;
  }
}

function getLastClosedCandleTimestamp(bucketSize: number) {
  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);

  const minutes = now.getTime() / 60000;
  const buckets = minutes % bucketSize;
  return (minutes - buckets - bucketSize) * 60000;
}

function aggregateCandles(candles: ICandlestick[]): ICandlestick {
  return {
    open: candles[0].open,
    high: Math.max(...candles.map((candle) => candle.high)),
    low: Math.min(...candles.map((candle) => candle.low)),
    close: candles[candles.length - 1].close,
    timestamp: candles[0].timestamp,
    volume: candles.reduce((acc, candle) => acc + candle.volume, 0),
  };
}
