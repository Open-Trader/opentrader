import { z } from "zod";
import { logger } from "@opentrader/logger";
import { BarSize } from "@opentrader/types";
import { cancelSmartTrade, IBotConfiguration, TBotContext, BotTemplate } from "@opentrader/bot-processor";

export function* testTicker(ctx: TBotContext<TestTickerConfig>) {
  const { config, onStart, onStop } = ctx;
  const { ticker } = ctx.market;

  if (onStop) {
    yield cancelSmartTrade();

    logger.info(`[TestTicker] Bot with ${config.symbol} pair stopped`);
    return;
  }

  if (onStart) {
    logger.info(`[TestTicker] Bot strategy started on ${config.symbol} pair`);
    return;
  }

  if (!ticker) {
    logger.warn("Missing ticker");
    return;
  }
  logger.info(
    `Ticker ${config.symbol} [${new Date(ticker.timestamp).toISOString()}]: Last: ${ticker.last}, Ask: ${ticker.ask}, Bid: ${ticker.bid}, High: ${ticker.high}, Low: ${ticker.low}`,
  );
}

testTicker.displayName = "TestTicker Strategy";
testTicker.description = "Test Ticker strategy";
testTicker.hidden = true;
testTicker.schema = z.object({});

testTicker.runPolicy = {
  onTickerChange: true,
} satisfies Template["runPolicy"];

testTicker.timeframe = BarSize.ONE_MINUTE;

testTicker.watchers = {
  watchTicker: ({ symbol }: IBotConfiguration) => symbol,
} satisfies Template["watchers"];

type Template = BotTemplate<TestTickerConfig>;

type BotSettings = z.infer<typeof testTicker.schema>;
type TestTickerConfig = IBotConfiguration<BotSettings>;
