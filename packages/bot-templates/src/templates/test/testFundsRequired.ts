import { z } from "zod";
import { logger } from "@opentrader/logger";
import { BarSize } from "@opentrader/types";
import {
  buy,
  sell,
  IBotConfiguration,
  TBotContext,
  BotTemplate,
} from "@opentrader/bot-processor";

const ExampleStrategySchema = z.object({
  quantity: z.number().min(0.001),
});

export function* exampleStrategy(ctx: TBotContext<ExampleStrategyBotConfig>) {
  const { config, onStart, onStop } = ctx;
  const { settings } = config;

  if (onStop) {
    logger.info(`[ExampleStrategy] Bot with ${config.symbol} pair stopped`);
    return;
  }

  if (onStart) {
    logger.info(`[ExampleStrategy] Bot strategy started on ${config.symbol} pair`);
    return;
  }

  // Simple example strategy logic
  if (Math.random() > 0.5) {
    yield buy({ quantity: settings.quantity });
  } else {
    yield sell({ quantity: settings.quantity });
  }

  logger.info(`[ExampleStrategy] Strategy executed`);
}

exampleStrategy.displayName = "Example Strategy";
exampleStrategy.description = 
  "A simple example strategy that demonstrates funds requirement validation. " +
  "It randomly buys or sells with the configured quantity.";
exampleStrategy.hidden = true; // Hide from UI since it's just an example
exampleStrategy.schema = ExampleStrategySchema;

exampleStrategy.runPolicy = {
  onCandleClosed: true,
} satisfies Template["runPolicy"];

exampleStrategy.timeframe = BarSize.ONE_MINUTE;

exampleStrategy.watchers = {
  watchCandles: ({ symbol }: IBotConfiguration) => symbol,
};

// Example of static funds requirement
exampleStrategy.fundsRequired = {
  ETH: 1,
  USDT: 100,
};

type Template = BotTemplate<ExampleStrategyBotConfig>;

export type ExampleStrategyBotConfig = IBotConfiguration<z.infer<typeof exampleStrategy.schema>>;