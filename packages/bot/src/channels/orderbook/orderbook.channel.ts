import { EventEmitter } from "node:events";
import { ExchangeClosedByUser, NetworkError, RequestTimeout } from "ccxt";
import { IExchange } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { IOrderbook, MarketId } from "@opentrader/types";
import type { OrderbookEvent } from "./types.js";

/**
 * Channel that subscribes to the orderbook on specific symbol.
 *
 * Emits:
 * - orderbook: `OrderbookEvent`
 *
 * @example
 * ```ts
 * const exchange = exchangeProvider.fromCode(ExchangeCode.OKX);
 *
 * const channel = new OrderbookChannel(symbol, exchange);
 *
 * channel.on("orderbook", (orderbook: OrderbookEvent) => {
 *   logger.info(orderbook, "New orderbook snapshot");
 * });
 * ```
 */
export class OrderbookChannel extends EventEmitter {
  public readonly symbol: string;
  public readonly exchange: IExchange;

  private enabled = false;

  constructor(symbol: string, exchange: IExchange) {
    super();
    this.symbol = symbol;
    this.exchange = exchange;
  }

  async init() {
    if (this.enabled) return;
    this.enabled = true;
    void this.watch();
  }

  private async watch() {
    while (this.enabled) {
      try {
        const orderbook: IOrderbook = await this.exchange.watchOrderbook(this.symbol);
        const event: OrderbookEvent = {
          exchangeCode: this.exchange.exchangeCode,
          marketId: `${this.exchange.exchangeCode}:${this.symbol}` as MarketId,
          isDemoMarket: this.exchange.isDemo,
          symbol: this.symbol,
          orderbook,
        };
        this.emit("orderbook", event);
      } catch (err) {
        if (err instanceof NetworkError || err instanceof RequestTimeout) {
          logger.warn(
            `[OrderbookChannel] ${err.name} occurred in ${this.exchange.exchangeCode}:${this.symbol}:  ${err.message}. Reconnecting in 3s…`,
          );
          await new Promise((resolve) => setTimeout(resolve, 3000)); // prevents infinite loop
        } else if (err instanceof ExchangeClosedByUser) {
          logger.info(`[OrderbookChannel] ExchangeClosedByUser: ${this.exchange.exchangeCode}:${this.symbol}`); // expected error when shutting down the platform

          this.stop();
          break;
        } else {
          logger.error(
            err,
            `[OrderbookChannel] Unhandled error occurred in ${this.exchange.exchangeCode}:${this.symbol}. Watcher stopped.`,
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
