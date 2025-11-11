import { BarSize, ICandlestick } from "@opentrader/types";
import { barSizeToDuration } from "./barSizeToDuration.js";

/**
 * Aggregate 1m candles to a higher timeframe.
 * @param candles - 1m candles
 * @param timeframe - The target timeframe to aggregate
 */
export function aggregateCandles(candles: ICandlestick[], timeframe: BarSize) {
  if (timeframe === BarSize.ONE_MINUTE) {
    return candles; // nothing to aggregate
  }

  const barSizeInMinutes = barSizeToDuration(timeframe) / 60000;

  const oneMinuteCandles = [...candles];
  const resultCandles: ICandlestick[] = [];
  while (oneMinuteCandles.length >= barSizeInMinutes) {
    resultCandles.push(aggregate(oneMinuteCandles.splice(0, barSizeInMinutes)));
  }

  return resultCandles;
}

function aggregate(candles: ICandlestick[]) {
  return {
    open: candles[0].open,
    high: candles.reduce((acc, candle) => Math.max(acc, candle.high), 0),
    low: candles.reduce((acc, candle) => Math.min(acc, candle.low), Infinity),
    close: candles[candles.length - 1].close,
    volume: candles.reduce((acc, candle) => acc + candle.volume, 0),
    timestamp: candles[0].timestamp,
  };
}
