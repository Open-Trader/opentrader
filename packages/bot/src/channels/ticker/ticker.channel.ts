import { EventEmitter } from "node:events";
import { ExchangeClosedByUser, NetworkError, RequestTimeout } from "ccxt";
import { MarketId, ITicker } from "@opentrader/types";
import { logger } from "@opentrader/logger";
import { IExchange } from "@opentrader/exchanges";
import type { TickerEvent } from "./types.js";

/**
 * Channel that subscribes to the ticker on specific symbol.
 *
 * Emits:
 * - ticker: `TickerEvent`
 *
 * @example
 * ```ts
 * const exchange = exchangeProvider.fromCode(ExchangeCode.OKX);
 *
 * const channel = new TickerChannel(symbol, exchange);
 *
 * channel.on("ticker", (ticker: TickerEvent) => {
 *   logger.info(ticker, "Ticker event received");
 * });
 * ```
 */
export class TickerChannel extends EventEmitter {
  public readonly symbol: string;
  private exchange: IExchange;
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
        const ticker: ITicker = await this.exchange.watchTicker(this.symbol);
        const event: TickerEvent = {
          exchangeCode: this.exchange.exchangeCode,
          marketId: `${this.exchange.exchangeCode}:${this.symbol}` as MarketId,
          isDemoMarket: this.exchange.isDemo,
          symbol: this.symbol,
          ticker,
        };
        this.emit("ticker", event);
      } catch (err) {
        if (err instanceof NetworkError || err instanceof RequestTimeout) {
          logger.warn(
            `[TickerChannel] ${err.name} occurred in ${this.exchange.exchangeCode}:${this.symbol}:  ${err.message}. Reconnecting in 3s…`,
          );
          await new Promise((resolve) => setTimeout(resolve, 3000)); // prevents infinite loop
        } else if (err instanceof ExchangeClosedByUser) {
          logger.info(`[TickerChannel] ExchangeClosedByUser: ${this.exchange.exchangeCode}:${this.symbol}`); // expected error when shutting down the platform

          this.stop();
          break;
        } else {
          logger.error(
            err,
            `[TickerChannel] Unhandled error occurred in ${this.exchange.exchangeCode}:${this.symbol}. Watcher stopped.`,
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

  get isDemoAccount() {
    return this.exchange.isDemo;
  }
}
