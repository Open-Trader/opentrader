import { exchangeProvider } from "@opentrader/exchanges";
import type { Context } from "../../../../utils/context.js";
import type { TGetCandlesInputSchema } from "./schema.js";

type Options = {
  ctx: Context;
  input: TGetCandlesInputSchema;
};

export async function getCandles(opts: Options) {
  const { input } = opts;
  const exchangeService = exchangeProvider.fromCode(input.exchangeCode, input.isDemoAccount);

  const symbols = await exchangeService.ccxt.fetchOHLCV(input.symbol, input.barSize, input.since, input.limit);

  return symbols;
}
