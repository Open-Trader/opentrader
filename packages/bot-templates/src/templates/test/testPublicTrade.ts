import { z } from "zod";
import { logger } from "@opentrader/logger";
import { BarSize } from "@opentrader/types";
import { cancelSmartTrade, IBotConfiguration, TBotContext, BotTemplate } from "@opentrader/bot-processor";
import { decomposeSymbol } from "@opentrader/tools";

export function* testPublicTrade(ctx: TBotContext<BotConfig>) {
  const { config, onStart, onStop } = ctx;
  const { trade } = ctx.market;

  if (onStop) {
    yield cancelSmartTrade();

    logger.info(`[TestPublicTrade] Bot with ${config.symbol} pair stopped`);
    return;
  }

  if (onStart) {
    logger.info(`[TestPublicTrade] Bot strategy started on ${config.symbol} pair`);
    return;
  }

  if (!trade) {
    logger.warn("Missing public trade");
    return;
  }

  const { baseCurrency, quoteCurrency } = decomposeSymbol(trade.symbol);
  logger.info(
    `Public trade ${config.symbol} [${new Date(trade.timestamp).toISOString()}]: ${trade.side.toUpperCase()} ${trade.amount} ${baseCurrency} with price ${trade.price} ${quoteCurrency}`,
  );
}

testPublicTrade.displayName = "TestPublicTrades Strategy";
testPublicTrade.description = "Test Public Trades strategy";
testPublicTrade.hidden = true;
testPublicTrade.schema = z.object({});

testPublicTrade.runPolicy = {
  onPublicTrade: true,
} satisfies Template["runPolicy"];

testPublicTrade.timeframe = BarSize.ONE_MINUTE;

testPublicTrade.watchers = {
  watchTrades: ({ symbol }: IBotConfiguration) => symbol,
};

type Template = BotTemplate<BotConfig>;

type BotSettings = z.infer<typeof testPublicTrade.schema>;
type BotConfig = IBotConfiguration<BotSettings>;
