import { EventEmitter } from "node:events";
import { ExchangeClosedByUser, NetworkError, RequestTimeout } from "ccxt";
import { MarketId, ITrade } from "@opentrader/types";
import { IExchange } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import type { TradeEvent } from "./types.js";

/**
 * Channel that subscribes to public trades on specific symbol.
 *
 * Emits:
 * - trade: `TradeEvent`
 *
 * @example
 * ```ts
 * const exchange = exchangeProvider.fromCode(ExchangeCode.OKX);
 *
 * const channel = new TradesChannel(symbol, exchange);
 *
 * channel.on("trade", (trade: TradeEvent) => {
 *   logger.info(trade, "New trade");
 * });
 * ```
 */
export class TradesChannel extends EventEmitter {
  public readonly symbol: string;
  private exchange;
  private enabled = false;

  constructor(symbol: string, exchange: IExchange) {
    super();
    this.symbol = symbol;
    this.exchange = exchange;
  }

  async init() {
    if (this.enabled) return;
    this.enabled = true;
    this.watch();
  }

  private async watch() {
    while (this.enabled) {
      try {
        const trades: ITrade[] = await this.exchange.watchTrades({ symbol: this.symbol });
        logger.debug(
          trades,
          `[TradesChannel] Received ${trades.length} trades for ${this.exchange.exchangeCode}:${this.symbol}`,
        );

        for (const trade of trades) {
          const tradeEvent: TradeEvent = {
            exchangeCode: this.exchange.exchangeCode,
            marketId: `${this.exchange.exchangeCode}:${this.symbol}` as MarketId,
            isDemoMarket: this.exchange.isDemo,
            symbol: this.symbol,
            trade,
          };
          this.emit("trade", tradeEvent);
        }
      } catch (err) {
        if (err instanceof NetworkError || err instanceof RequestTimeout) {
          logger.warn(
            `[TradesChannel] ${err.name} occurred in ${this.exchange.exchangeCode}:${this.symbol}:  ${err.message}. Reconnecting in 3s…`,
          );
          await new Promise((resolve) => setTimeout(resolve, 3000)); // prevents infinite loop
        } else if (err instanceof ExchangeClosedByUser) {
          logger.info(`[TradesChannel] ExchangeClosedByUser: ${this.exchange.exchangeCode}:${this.symbol}`); // expected error when shutting down the platform

          this.stop();
          break;
        } else {
          logger.error(
            err,
            `[TradesChannel] Unhandled error occurred in ${this.exchange.exchangeCode}:${this.symbol}. Watcher stopped.`,
          );

          this.stop();
          break;
        }
      }
    }
  }

  stop() {
    this.enabled = false;
  }
}
