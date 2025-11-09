import { exchangeProvider } from "@opentrader/exchanges";
import type { Context } from "../../../../utils/context.js";
import type { TGetSymbolsInputSchema } from "./schema.js";

type Options = {
  ctx: Context;
  input: TGetSymbolsInputSchema;
};

export async function getSymbols(opts: Options) {
  const { input } = opts;
  const exchangeService = exchangeProvider.fromCode(input.exchangeCode, input.isDemoAccount);

  const symbols = await exchangeService.getSymbols();

  return symbols;
}
