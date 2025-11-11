import { z } from "zod";
import { logger } from "@opentrader/logger";
import { BarSize } from "@opentrader/types";
import {
  cancelSmartTrade,
  IBotConfiguration,
  TBotContext,
  BotTemplate,
  all,
  useExchange,
} from "@opentrader/bot-processor";
import { IExchange } from "@opentrader/exchanges";

export function* testAllEffect(ctx: TBotContext<BotConfig>) {
  const { config, onStart, onStop } = ctx;

  if (onStart) {
    logger.info(`[TestAllEffect] Bot strategy started on ${config.symbol} pair`);

    // 1. Testing with promises
    const promise1 = new Promise((resolve) => setTimeout(() => resolve("result1"), 3000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("result2"), 3000));

    const t0 = Date.now();
    const [result1, result2]: [string, string] = yield all([promise1, promise2]);
    const t1 = Date.now();
    const duration = t1 - t0;

    logger.info(
      `[TestAllEffect] Yielded all() effect in ${duration}ms. Promise1 result: ${result1}, Promise2 result: ${result2}`,
    );

    // 2. Using other effects
    const promise3 = new Promise((resolve) => setTimeout(() => resolve("result3"), 1000));
    const [exchange, result]: [IExchange, string] = yield all([useExchange(), promise3]);

    logger.info(
      `[TestAllEffect] Yielded all([useExchange(), promise]). Result1: ${exchange.exchangeCode}, Result2: ${result}`,
    );

    // 3. Should throw an error when yielding invalid values
    // yield all(["string"]);

    return;
  }

  if (onStop) {
    yield cancelSmartTrade();

    logger.info(`[TestAllEffect] Bot with ${config.symbol} pair stopped`);
    return;
  }

  logger.info(`[TestAllEffect] Strategy executed`);
}

testAllEffect.displayName = "Test yield all() effect";
testAllEffect.description = "Test yield all() effect";
testAllEffect.hidden = true;
testAllEffect.schema = z.object({});

testAllEffect.runPolicy = {} satisfies Template["runPolicy"];

testAllEffect.timeframe = BarSize.ONE_MINUTE;

testAllEffect.watchers = {};

type Template = BotTemplate<BotConfig>;

type BotSettings = z.infer<typeof testAllEffect.schema>;
type BotConfig = IBotConfiguration<BotSettings>;
