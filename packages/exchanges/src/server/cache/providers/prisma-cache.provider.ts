import type { Dictionary, Market } from "ccxt";
import type { ExchangeCode } from "@opentrader/types";
import { xprisma } from "@opentrader/db";
import type { ICacheProvider } from "../../../types/cache/cache-provider.interface.js";
import type { IExchange } from "../../../types/exchange.interface.js";

type CacheKey = ExchangeCode | `demo-${ExchangeCode}`;

export class PrismaCacheProvider implements ICacheProvider {
  async getMarkets(exchange: IExchange) {
    const startTime = Date.now();

    const cacheKey = `${exchange.isDemo ? "demo-" : ""}${exchange.exchangeCode}` as const;
    const cachedMarkets = await xprisma.markets.findUnique({
      where: {
        exchangeCode: cacheKey,
      },
    });

    if (cachedMarkets) {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      console.info(
        `PrismaCacheProvider: Fetched ${Object.keys(cachedMarkets).length} markets on ${cacheKey} from cache in ${duration}s`,
      );

      return cachedMarkets.markets as any as Dictionary<Market>;
    }

    // If not cached, loadMarkets and cache to DB
    const markets = await exchange.ccxt.loadMarkets();

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.info(
      `PrismaCacheProvider: Fetched ${Object.keys(markets).length} markets on ${cacheKey} exchange in ${duration}s`,
    );

    return this.cacheMarkets(markets, cacheKey);
  }

  private async cacheMarkets(markets: Dictionary<Market>, cacheKey: CacheKey) {
    await xprisma.markets.create({
      data: {
        exchangeCode: cacheKey,
        markets: JSON.stringify(markets),
      },
    });
    return markets;
  }
}
