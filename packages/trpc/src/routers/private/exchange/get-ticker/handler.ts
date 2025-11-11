import { exchangeProvider } from "@opentrader/exchanges";
import type { Context } from "../../../../utils/context.js";
import type { TGetExchangeTickerSchema } from "./schema.js";

type Options = {
  ctx: Context;
  input: TGetExchangeTickerSchema;
};

export async function getTicker(opts: Options) {
  const { input } = opts;

  const exchange = exchangeProvider.fromCode(input.exchangeCode, input.isDemoAccount);
  const ticker = await exchange.getTicker(input.symbol);

  return ticker;
}
