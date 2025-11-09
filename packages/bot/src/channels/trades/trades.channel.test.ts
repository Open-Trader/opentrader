import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IExchange } from "@opentrader/exchanges";
import { ITrade, ExchangeCode } from "@opentrader/types";
import { TradesChannel } from "./trades.channel.js";

function createMockExchange(): IExchange {
  return {
    exchangeCode: ExchangeCode.BINANCE,
    isDemo: false,
    watchTrades: vi.fn(),
  } as unknown as IExchange;
}

function createMockTrades(symbol: string): ITrade[] {
  return [
    {
      symbol,
      timestamp: Math.floor(Date.now() / 60000) * 60000,
      price: 100.2,
      amount: 0.5,
      side: "buy",
      id: "trade-1",
    },
    {
      symbol,
      timestamp: Math.floor(Date.now() / 60000) * 60000 + 1000,
      price: 100.1,
      amount: 0.3,
      side: "sell",
      id: "trade-2",
    },
  ];
}

describe("TradesChannel", () => {
  const symbol = "BTC/USDT";
  let mockExchange: IExchange;
  let channel: TradesChannel;

  beforeEach(() => {
    mockExchange = createMockExchange();
    mockExchange.watchTrades = vi
      .fn()
      .mockResolvedValueOnce(createMockTrades(symbol))
      .mockImplementation(() => new Promise(() => {})); // prevent infinite loop
    channel = new TradesChannel(symbol, mockExchange);
  });

  it("should emit trade events with correct structure", async () => {
    const spy = vi.fn();
    channel.on("trade", spy);

    await channel.init();
    await Promise.resolve(); // allow event to propagate
    channel.stop();

    expect(mockExchange.watchTrades).toHaveBeenCalledWith({ symbol });
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        exchangeCode: "BINANCE",
        symbol,
        trade: expect.objectContaining({
          symbol,
          price: expect.any(Number),
          amount: expect.any(Number),
          timestamp: expect.any(Number),
          side: expect.any(String),
        }),
      }),
    );
  });

  it("should stop watching when stop() is called", async () => {
    await channel.init();
    channel.stop();
    expect((channel as any).enabled).toBe(false);
  });

  it("should not start watching again if already initialized", async () => {
    const watchSpy = vi.spyOn(channel as any, "watch");
    await channel.init();
    await channel.init();
    expect(watchSpy).toHaveBeenCalledTimes(1);
  });
});
