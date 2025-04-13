import { pro as ccxt } from "ccxt";
import { ExchangeCode } from "@opentrader/types";

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
  [ExchangeCode.PARADEX]: "paradex",
  [ExchangeCode.HYPERLIQUID]: "hyperliquid"  
};
