import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IExchange } from "@opentrader/exchanges";
import { ExchangeCode, ITicker } from "@opentrader/types";
import { TickerChannel } from "./ticker.channel.js";

function createMockExchange(): IExchange {
  return {
    exchangeCode: ExchangeCode.BINANCE,
    isDemo: false,
    watchTicker: vi.fn(),
  } as unknown as IExchange;
}

function createMockTicker(symbol: string): ITicker {
  return {
    symbol,
    timestamp: Math.floor(Date.now() / 60000) * 60000, // aligned to 1m
    bid: 100.2,
    ask: 100.3,
    last: 100.25,
    open: 99.5,
    high: 101.0,
    low: 98.7,
    close: 100.25,
    baseVolume: 123.45,
    quoteVolume: 12345,
  };
}

describe("TickerChannel", () => {
  const symbol = "BTC/USDT";
  let mockExchange: IExchange;
  let channel: TickerChannel;

  beforeEach(() => {
    mockExchange = createMockExchange();
    mockExchange.watchTicker = vi.fn().mockResolvedValue(createMockTicker(symbol));
    channel = new TickerChannel(symbol, mockExchange);
  });

  it("should emit a ticker event with correct structure", async () => {
    const eventSpy = vi.fn();
    channel.on("ticker", eventSpy);

    await channel.init();
    await Promise.resolve(); // allow event to propagate
    channel.stop(); // stop after one successful emit

    expect(mockExchange.watchTicker).toHaveBeenCalledWith(symbol);
    expect(eventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        exchangeCode: ExchangeCode.BINANCE,
        symbol,
        ticker: expect.objectContaining({
          symbol,
          bid: expect.any(Number),
          ask: expect.any(Number),
          last: expect.any(Number),
          baseVolume: expect.any(Number),
          quoteVolume: expect.any(Number),
          timestamp: expect.any(Number),
        }),
      }),
    );
  });

  it("should stop emitting when stop() is called", async () => {
    await channel.init();
    channel.stop();
    expect(channel["enabled"]).toBe(false);
  });

  it("should only start watching once on repeated init()", async () => {
    const watchSpy = vi.spyOn(channel as any, "watch");
    await channel.init();
    await channel.init();
    channel.stop();
    expect(watchSpy).toHaveBeenCalledTimes(1);
  });
});
