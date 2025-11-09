import { pro as ccxt } from "ccxt";
import { ExchangeCode } from "@opentrader/types";

/**
 * Just a guard. Uncomment this to see what exchanges were added or removed from CCXT.
 */
// type EnsureEqual<T, U extends T = T> = T extends U ? true : never;
// type EnsureNoDeletedExchanges = EnsureEqual<ExchangeCode, Uppercase<keyof typeof exchanges>>;
// type EnsureNotNewExchangesAdded = EnsureEqual<Uppercase<keyof typeof exchanges>, ExchangeCode>;

/**
 * Map exchange code to CCXT instance class name
 */
export const exchangeCodeMapCCXT: Record<ExchangeCode, keyof typeof ccxt> = {
  [ExchangeCode.OKX]: "okx",
  [ExchangeCode.BYBIT]: "bybit",
  [ExchangeCode.BITGET]: "bitget",
  [ExchangeCode.BINANCE]: "binance",
  [ExchangeCode.KRAKEN]: "kraken",
  [ExchangeCode.COINBASE]: "coinbase",
  [ExchangeCode.GATEIO]: "gateio",
};
