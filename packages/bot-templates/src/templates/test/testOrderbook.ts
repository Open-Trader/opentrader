import { z } from "zod";
import { logger } from "@opentrader/logger";
import { BarSize } from "@opentrader/types";
import { cancelSmartTrade, IBotConfiguration, TBotContext, BotTemplate } from "@opentrader/bot-processor";

export function* testOrderbook(ctx: TBotContext<TestOrderbookConfig>) {
  const { config, onStart, onStop } = ctx;
  const { orderbook } = ctx.market;

  if (onStop) {
    yield cancelSmartTrade();

    logger.info(`[TestOrderbook] Bot with ${config.symbol} pair stopped`);
    return;
  }

  if (onStart) {
    logger.info(`[TestOrderbook] Bot strategy started on ${config.symbol} pair`);
    return;
  }

  if (!orderbook) {
    logger.warn("Missing orderbook");
    return;
  }
  logger.info(
    `Orderbook ${config.symbol} [${new Date(orderbook.timestamp).toISOString()}]: Asks: ${orderbook.asks.length}, Bids: ${orderbook.bids.length}`,
  );
}

testOrderbook.displayName = "TestOrderbook Strategy";
testOrderbook.description = "Test Orderbook Strategy";
testOrderbook.hidden = true;
testOrderbook.schema = z.object({});

testOrderbook.runPolicy = {
  onOrderbookChange: true,
} satisfies Template["runPolicy"];

testOrderbook.timeframe = BarSize.ONE_MINUTE;

testOrderbook.watchers = {
  watchOrderbook: ({ symbol }: IBotConfiguration) => symbol,
};

type Template = BotTemplate<TestOrderbookConfig>;

type BotSettings = z.infer<typeof testOrderbook.schema>;
type TestOrderbookConfig = IBotConfiguration<BotSettings>;
