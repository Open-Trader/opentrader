import { MarketData, MarketEvent, MarketId, StrategyEventType } from "@opentrader/types";

type MarketKey = string;

function getMarketKey(marketId: string, isDemoMarket: boolean): MarketKey {
  return isDemoMarket ? `demo-${marketId}` : `${marketId}`;
}

/**
 * BotMarketStore
 *
 * A per-bot store for holding the most recent market data (candles, orderbook, ticker, trades)
 * received through MarketsStream.
 *
 * Market data is scoped by a combination of MarketId and `isDemoMarket` flag to ensure
 * separation between parallel environments.
 *
 * Used by the StrategyRunner during event processing to provide the latest
 * market snapshot relevant to the strategy function.
 */
export class BotMarketStore {
  private data: Record<MarketKey, MarketData> = {};

  update(event: MarketEvent) {
    const marketKey = getMarketKey(event.marketId, event.isDemoMarket);
    if (!this.data[marketKey]) this.data[marketKey] = { candles: [] };

    switch (event.type) {
      case StrategyEventType.onCandleClosed:
        this.data[marketKey].candle = event.candle;
        this.data[marketKey].candles = event.candles;
        break;
      case StrategyEventType.onOrderbookChange:
        this.data[marketKey].orderbook = event.orderbook;
        break;
      case StrategyEventType.onTickerChange:
        this.data[marketKey].ticker = event.ticker;
        break;
      case StrategyEventType.onPublicTrade:
        this.data[marketKey].trade = event.trade;
        break;
    }
  }

  get(marketId: MarketId, isDemo: boolean): MarketData | undefined {
    const marketKey = getMarketKey(marketId, isDemo);
    return this.data[marketKey];
  }

  getMany(marketIds: MarketId[], isDemo: boolean): Record<MarketKey, MarketData> {
    const result: Record<MarketKey, MarketData> = {};

    for (const marketId of marketIds) {
      const key = getMarketKey(marketId, isDemo);
      const market = this.data[key];

      if (market) result[key] = market;
    }

    return result;
  }
}
