import { describe, it, expect } from "vitest";

import { BarSize, ICandlestick } from "@opentrader/types";
import { aggregateCandles } from "./aggregateCandles.js";

// Sample 1-minute candles for testing
const oneMinuteCandles: ICandlestick[] = [
  { timestamp: 0, open: 1, high: 2, low: 1, close: 2, volume: 10 },
  { timestamp: 60000, open: 2, high: 3, low: 2, close: 3, volume: 20 },
  { timestamp: 120000, open: 3, high: 4, low: 3, close: 4, volume: 30 },
  { timestamp: 180000, open: 4, high: 5, low: 3, close: 5, volume: 40 },
  { timestamp: 240000, open: 5, high: 6, low: 4, close: 6, volume: 50 },
];

describe("aggregateCandles", () => {
  it("returns the original candles array if timeframe is 1 minute", () => {
    const result = aggregateCandles(oneMinuteCandles, BarSize.ONE_MINUTE);
    expect(result).toEqual(oneMinuteCandles);
  });

  it("correctly aggregates 1-minute candles into 5-minute candles", () => {
    const result = aggregateCandles(oneMinuteCandles, BarSize.FIVE_MINUTES);

    expect(result).toEqual([
      {
        timestamp: 0,
        open: 1,
        high: 6,
        low: 1,
        close: 6,
        volume: 10 + 20 + 30 + 40 + 50,
      },
    ]);
  });

  it("returns an empty array if there are not enough candles to fill the specified timeframe", () => {
    const insufficientCandles = oneMinuteCandles.slice(0, 3); // only 3 minutes of data
    const result = aggregateCandles(insufficientCandles, BarSize.FIVE_MINUTES);
    expect(result).toEqual([]);
  });

  it("correctly aggregates multiple 5-minute candles if there are enough data", () => {
    const extendedCandles: ICandlestick[] = [
      ...oneMinuteCandles,
      ...oneMinuteCandles.map((candle) => ({
        ...candle,
        timestamp: candle.timestamp + 300000,
      })),
    ];

    const result = aggregateCandles(extendedCandles, BarSize.FIVE_MINUTES);

    expect(result).toEqual([
      {
        timestamp: 0,
        open: 1,
        high: 6,
        low: 1,
        close: 6,
        volume: 10 + 20 + 30 + 40 + 50,
      },
      {
        timestamp: 300000,
        open: 1,
        high: 6,
        low: 1,
        close: 6,
        volume: 10 + 20 + 30 + 40 + 50,
      },
    ]);
  });
});
