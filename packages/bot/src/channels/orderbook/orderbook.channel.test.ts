import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IExchange } from "@opentrader/exchanges";
import type { ExchangeCode, IOrderbook } from "@opentrader/types";
import { OrderbookChannel } from "./orderbook.channel.js";

function createMockExchange(): IExchange {
  return {
    exchangeCode: "BINANCE" as ExchangeCode,
    isDemo: false,
    watchOrderbook: vi.fn(),
  } as unknown as IExchange;
}

function createMockOrderbook(symbol: string): IOrderbook {
  return {
    symbol,
    asks: [
      { price: 100.1, quantity: 1.5 },
      { price: 100.2, quantity: 2.0 },
    ],
    bids: [
      { price: 99.9, quantity: 1.1 },
      { price: 99.8, quantity: 1.8 },
    ],
    timestamp: Math.floor(Date.now() / 60000) * 60000, // aligned to 1m
  };
}

describe("OrderbookChannel", () => {
  const symbol = "BTC/USDT";
  let mockExchange: IExchange;
  let channel: OrderbookChannel;

  beforeEach(() => {
    mockExchange = createMockExchange();
    mockExchange.watchOrderbook = vi.fn().mockResolvedValue(createMockOrderbook(symbol));
    channel = new OrderbookChannel(symbol, mockExchange);
  });

  it("should emit an orderbook event with correct structure", async () => {
    const eventSpy = vi.fn();
    channel.on("orderbook", eventSpy);

    await channel.init();
    await Promise.resolve(); // allow event to propagate
    channel.stop(); // stop after one successful emit

    expect(mockExchange.watchOrderbook).toHaveBeenCalledWith(symbol);
    expect(eventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        exchangeCode: "BINANCE",
        symbol,
        orderbook: expect.objectContaining({
          symbol,
          asks: expect.arrayContaining([{ price: 100.1, quantity: 1.5 }]),
          bids: expect.arrayContaining([{ price: 99.9, quantity: 1.1 }]),
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
