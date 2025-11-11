import { EventEmitter } from "node:events";
import type { TBotWithExchangeAccount } from "@opentrader/db";
import { findStrategy } from "@opentrader/bot-templates/server";
import { getWatchers, getTimeframe, getRequiredHistory } from "../processing/index.js";
import { decomposeSymbolId } from "@opentrader/tools";
import { BarSize, ExchangeCode, ICandlestick, MarketId } from "@opentrader/types";
import { exchangeProvider } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { CandlesChannel, type CandleEvent } from "../channels/index.js";

class CandlesRegistry {
  private channels: Map<string, CandlesChannel> = new Map();

  getKey(exchangeCode: ExchangeCode, symbol: string, timeframe: string, isDemoAccount: boolean): string {
    const demoSuffix = isDemoAccount ? "-demo" : "";
    return `${exchangeCode}${demoSuffix}:${symbol}#${timeframe}`;
  }

  async getOrCreate(
    exchangeCode: ExchangeCode,
    symbol: string,
    timeframe: BarSize,
    isDemoAccount: boolean,
    requiredHistory?: number,
  ): Promise<CandlesChannel> {
    const key = this.getKey(exchangeCode, symbol, timeframe, isDemoAccount);
    if (this.channels.has(key)) return this.channels.get(key)!;

    const exchange = exchangeProvider.fromCode(exchangeCode, isDemoAccount);
    const channel = new CandlesChannel(symbol, timeframe, exchange);
    await channel.init(requiredHistory);
    channel.start();
    this.channels.set(key, channel);
    return channel;
  }

  getActiveKeysFromBots(bots: TBotWithExchangeAccount[]): Set<string> {
    const activeKeys = new Set<string>();

    for (const bot of bots) {
      const { strategyFn } = findStrategy(bot.template);
      const { watchCandles } = getWatchers(strategyFn, bot);
      const timeframe = getTimeframe(strategyFn, bot);

      if (!timeframe) {
        logger.warn(`[CandlesRegistry]: Skip key generation [${bot.id} - ${bot.name}] - No timeframe defined.`);
        continue;
      }

      for (const symbolId of watchCandles) {
        const { exchangeCode, currencyPairSymbol: symbol } = decomposeSymbolId(symbolId);
        const { isDemoAccount } = bot.exchangeAccount;
        const key = this.getKey(exchangeCode, symbol, timeframe, isDemoAccount);
        activeKeys.add(key);
      }
    }

    return activeKeys;
  }

  cleanupFromBots(bots: TBotWithExchangeAccount[]) {
    const activeKeys = this.getActiveKeysFromBots(bots);
    this.cleanup(activeKeys);
  }

  private cleanup(activeKeys: Set<string>) {
    for (const [key, channel] of this.channels.entries()) {
      if (!activeKeys.has(key)) {
        logger.info(`[CandlesRegistry] Removing stale channel for ${key}`);
        channel.stop();
        this.channels.delete(key);
      }
    }
  }

  stopAll() {
    for (const channel of this.channels.values()) {
      channel.stop();
    }
    this.channels.clear();
  }
}

/**
 * Emits:
 * - candle: CandleEvent
 */
export class CandlesStream extends EventEmitter {
  private bots: TBotWithExchangeAccount[] = [];
  private registry = new CandlesRegistry();

  constructor(bots: TBotWithExchangeAccount[]) {
    super();
    this.bots = bots;
  }

  async create() {
    for (const bot of this.bots) {
      await this.addBot(bot);
    }
  }

  async addBot(bot: TBotWithExchangeAccount) {
    const { strategyFn } = findStrategy(bot.template);
    const { watchCandles: symbols } = getWatchers(strategyFn, bot);
    const requiredHistory = getRequiredHistory(strategyFn, bot);
    const timeframe = getTimeframe(strategyFn, bot);

    if (!timeframe) {
      logger.warn(`[CandlesStream]: Skipping bot [${bot.id} - ${bot.name}] - No timeframe defined.`);
      return;
    }

    for (const symbolId of symbols) {
      const { exchangeCode, currencyPairSymbol: symbol } = decomposeSymbolId(symbolId);
      const { isDemoAccount } = bot.exchangeAccount;
      const key = this.registry.getKey(exchangeCode, symbol, timeframe, isDemoAccount);

      const channel = await this.registry.getOrCreate(exchangeCode, symbol, timeframe, isDemoAccount, requiredHistory);
      channel.on("candle", (candle: ICandlestick, history: ICandlestick[]) => {
        const event: CandleEvent = {
          exchangeCode,
          symbol,
          marketId: `${exchangeCode}:${symbol}` as MarketId,
          isDemoMarket: isDemoAccount,
          timeframe,
          candle,
          history,
        };
        this.emit("candle", event);
      });

      logger.info(`[CandlesStream]: Bot [${bot.id} - ${bot.name}] subscribed to ${key}`);
    }
  }

  cleanStaleChannels(bots: TBotWithExchangeAccount[]) {
    this.registry.cleanupFromBots(bots);
  }

  destroy() {
    this.registry.stopAll();
  }
}
