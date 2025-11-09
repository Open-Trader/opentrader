import { EventEmitter } from "node:events";
import type { TBotWithExchangeAccount } from "@opentrader/db";
import { findStrategy } from "@opentrader/bot-templates/server";
import { getWatchers } from "../processing/index.js";
import { decomposeSymbolId } from "@opentrader/tools";
import { ExchangeCode } from "@opentrader/types";
import { exchangeProvider } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { TradesChannel, type TradeEvent } from "../channels/index.js";

class TradesRegistry {
  private channels: Map<string, TradesChannel> = new Map();

  getKey(exchangeCode: ExchangeCode, symbol: string, isDemoAccount: boolean): string {
    return `${exchangeCode}${isDemoAccount ? "-demo" : ""}:${symbol}`;
  }

  async getOrCreate(exchangeCode: ExchangeCode, symbol: string, isDemoAccount: boolean): Promise<TradesChannel> {
    const key = this.getKey(exchangeCode, symbol, isDemoAccount);
    if (this.channels.has(key)) return this.channels.get(key)!;

    const exchange = exchangeProvider.fromCode(exchangeCode, isDemoAccount);
    const channel = new TradesChannel(symbol, exchange);
    await channel.init();
    this.channels.set(key, channel);
    return channel;
  }

  getActiveKeysFromBots(bots: TBotWithExchangeAccount[]): Set<string> {
    const activeKeys = new Set<string>();

    for (const bot of bots) {
      const { strategyFn } = findStrategy(bot.template);
      const { watchTrades } = getWatchers(strategyFn, bot);
      const { isDemoAccount } = bot.exchangeAccount;

      for (const symbolId of watchTrades) {
        const { exchangeCode, currencyPairSymbol: symbol } = decomposeSymbolId(symbolId);
        activeKeys.add(this.getKey(exchangeCode, symbol, isDemoAccount));
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
        logger.info(`[TradesRegistry] Removing stale channel for ${key}`);
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
 * - trade: TradeEvent
 */
export class TradesStream extends EventEmitter {
  private bots: TBotWithExchangeAccount[] = [];
  private registry = new TradesRegistry();

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
    const { watchTrades: symbols } = getWatchers(strategyFn, bot);
    const { isDemoAccount } = bot.exchangeAccount;

    for (const symbolId of symbols) {
      const { exchangeCode, currencyPairSymbol: symbol } = decomposeSymbolId(symbolId);
      const channel = await this.registry.getOrCreate(exchangeCode, symbol, isDemoAccount);
      channel.on("trade", (event: TradeEvent) => {
        this.emit("trade", event);
      });

      const key = this.registry.getKey(exchangeCode, symbol, isDemoAccount);
      logger.info(`[TradesStream]: Bot [${bot.id} - ${bot.name}] subscribed to ${key}`);
    }
  }

  cleanStaleChannels(bots: TBotWithExchangeAccount[]) {
    this.registry.cleanupFromBots(bots);
  }

  destroy() {
    this.registry.stopAll();
  }
}
