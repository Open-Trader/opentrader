import { exchangeProvider, IExchange } from "@opentrader/exchanges";
import { decomposeSymbolId } from "@opentrader/tools";
import type { ExchangeCode } from "@opentrader/types";
import type { Context } from "../../../../utils/context.js";
import type { TGetGridBotFormOptionsInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetGridBotFormOptionsInputSchema;
};

// /**
//  * Returns the Highest and Lowest price for last month.
//  *
//  * @param exchangeCode - Exchange code
//  * @param currencyPair - Currency pair. e.g. BTC/USDT
//  */
// async function fetchHighestAndLowestPrice(
//   exchangeCode: ExchangeCode,
//   currencyPair: string,
// ) {
//   const exchange = exchangeProvider.fromCode(exchangeCode);
//
//   const oneMonthAgo = Date.now() - 28 * 24 * 3600 * 1000; // days * hours * seconds * ms
//   const candlesticks = await exchange.getCandlesticks({
//     symbol: currencyPair,
//     bar: BarSize.ONE_DAY,
//     since: oneMonthAgo,
//   });
//
//   const lowestCandlestick = findLowestCandlestickBy("low", candlesticks);
//   const highestCandlestick = findHighestCandlestickBy("high", candlesticks);
//
//   return { lowestCandlestick, highestCandlestick };
// }

async function calcHighLowPrice(exchange: IExchange, currencyPair: string) {
  const { price } = await exchange.getMarketPrice({
    symbol: currencyPair,
  });

  const highPrice = price + price * 0.3; // +30% up
  const lowPrice = price - price * 0.3; // -30% down

  return { highPrice, lowPrice };
}

export async function getFormOptions({ input }: Options) {
  const { symbolId, isDemoAccount } = input;
  const { exchangeCode, currencyPairSymbol } = decomposeSymbolId(symbolId);

  const exchange = exchangeProvider.fromCode(exchangeCode, isDemoAccount);
  const { highPrice, lowPrice } = await calcHighLowPrice(exchange, currencyPairSymbol);

  return {
    highPrice,
    lowPrice,
  };
}
