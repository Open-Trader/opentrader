import { z } from "zod";
import { useExchange, type TBotContext } from "@opentrader/bot-processor";
import { logger } from "@opentrader/logger";
import { IExchange } from "@opentrader/exchanges";
import { IAccountAsset } from "@opentrader/types";

export function* testSubgenerator(ctx: TBotContext<any>) {
  if (ctx.onStart) {
    logger.info(`[TestSubgenerator] Bot started`);

    const balances = yield* queryBalances();
    logger.info(balances, "Subgenerator result");

    return;
  }
  if (ctx.onStop) {
    logger.info(`[TestSubgenerator] Bot stopped`);
    return;
  }

  logger.info("[TestSubgenerator] Executing strategy template");
}

function* queryBalances() {
  const exchange: IExchange = yield useExchange();
  const assets: IAccountAsset[] = yield exchange.accountAssets();

  return assets;
}

testSubgenerator.displayName = "Test Subgenerator";
testSubgenerator.hidden = true;
testSubgenerator.schema = z.object({});
