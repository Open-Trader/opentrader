import { z } from "zod";
import { BotTemplate, IBotConfiguration, type TBotContext } from "@opentrader/bot-processor";
import { logger } from "@opentrader/logger";

export function* testError(ctx: TBotContext<any>) {
  if (ctx.onStop) {
    logger.info("[TestError] Stopping strategy");
    return;
  }

  if (ctx.onStart) {
    logger.info("[TestError] Strategy started");
    return;
  }

  logger.info("[TestError] Executing strategy template");
  yield Promise.reject("Simulated error in the strategy template");
}

testError.schema = z.object({});
testError.hidden = true;
testError.watchers = {
  watchTicker: ({ symbol }: IBotConfiguration) => symbol,
} satisfies BotTemplate<any>["watchers"];
testError.runPolicy = {
  onTickerChange: true,
} satisfies BotTemplate<any>["runPolicy"];
