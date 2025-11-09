import { exchangeProvider } from "@opentrader/exchanges";
import { xprisma } from "@opentrader/db";
import type { Context } from "../../../../utils/context.js";
import type { TGetExchangeAssetsSchema } from "./schema.js";

type Options = {
  ctx: Context;
  input: TGetExchangeAssetsSchema;
};

export async function getExchangeAssets(opts: Options) {
  const { input } = opts;

  const exchangeAccount = await xprisma.exchangeAccount.findUniqueOrThrow({ where: { id: input.exchangeAccountId } });
  const exchange = exchangeProvider.fromAccount(exchangeAccount);
  const assets = await exchange.accountAssets();

  return assets;
}
