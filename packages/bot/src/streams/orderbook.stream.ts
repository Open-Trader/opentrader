import { EventEmitter } from "node:events";
import { logger } from "@opentrader/logger";
import type { TBotWithExchangeAccount } from "@opentrader/db";
import { findStrategy } from "@opentrader/bot-templates/server";
import { getWatchers } from "../processing/index.js";
import { decomposeSymbolId } from "@opentrader/tools";
import { ExchangeCode } from "@opentrader/types";
import { exchangeProvider } from "@opentrader/exchanges";
import type { OrderbookEvent } from "../channels/index.js";
import { OrderbookChannel } from "../channels/index.js";

class OrderbookRegistry {
  private channels: Map<string, OrderbookChannel> = new Map();

  getKey(exchangeCode: ExchangeCode, symbol: string, isDemoAccount: boolean): string {
    return `${exchangeCode}${isDemoAccount ? "-demo" : ""}:${symbol}`;
  }

  async getOrCreate(exchangeCode: ExchangeCode, symbol: string, isDemoAccount: boolean): Promise<OrderbookChannel> {
    const key = this.getKey(exchangeCode, symbol, isDemoAccount);
    if (this.channels.has(key)) return this.channels.get(key)!;

    const exchange = exchangeProvider.fromCode(exchangeCode, isDemoAccount);
    const channel = new OrderbookChannel(symbol, exchange);
    await channel.init();
    this.channels.set(key, channel);
    return channel;
  }

  getActiveKeysFromBots(bots: TBotWithExchangeAccount[]): Set<string> {
    const activeKeys = new Set<string>();

    for (const bot of bots) {
      const { strategyFn } = findStrategy(bot.template);
      const { watchOrderbook } = getWatchers(strategyFn, bot);
      const { isDemoAccount } = bot.exchangeAccount;

      for (const symbolId of watchOrderbook) {
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
        logger.info(`[OrderbookRegistry] Removing stale channel for ${key}`);
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

  getAll(): OrderbookChannel[] {
    return Array.from(this.channels.values());
  }
}

/**
 * Emits:
 * - orderbook: OrderbookEvent
 */
export class OrderbookStream extends EventEmitter {
  private bots: TBotWithExchangeAccount[] = [];
  private registry = new OrderbookRegistry();

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
    const { watchOrderbook: symbols } = getWatchers(strategyFn, bot);
    const { isDemoAccount } = bot.exchangeAccount;

    for (const symbolId of symbols) {
      const { exchangeCode, currencyPairSymbol: symbol } = decomposeSymbolId(symbolId);
      const channel = await this.registry.getOrCreate(exchangeCode, symbol, isDemoAccount);
      channel.on("orderbook", (event: OrderbookEvent) => {
        this.emit("orderbook", event);
      });

      logger.info(`[OrderbookStream]: Bot [${bot.id} - ${bot.name}] subscribed to ${exchangeCode}:${symbol}`);
    }
  }

  cleanStaleChannels(bots: TBotWithExchangeAccount[]) {
    this.registry.cleanupFromBots(bots);
  }

  destroy() {
    this.registry.stopAll();
  }
}
