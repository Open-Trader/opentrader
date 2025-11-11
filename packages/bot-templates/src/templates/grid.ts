import { z } from "zod";
import type { IBotConfiguration, TBotContext } from "@opentrader/bot-processor";
import { calcGridLines } from "@opentrader/tools";
import type { GridBotConfig } from "./grid-bot.js";
import { gridBot } from "./grid-bot.js";

/**
 * Wrapper for the `gridBot` template with a simplified configuration.
 * @param ctx - Bot context
 */
export function* grid(ctx: TBotContext<GridBotLiteConfig>) {
  const { config } = ctx;

  const gridLines = calcGridLines(
    config.settings.highPrice,
    config.settings.lowPrice,
    config.settings.gridLevels,
    config.settings.quantityPerGrid,
  );

  // Create a new context for the `gridBot` template
  const gridBotCtx: TBotContext<GridBotConfig> = {
    ...ctx,
    config: {
      ...ctx.config,
      settings: {
        gridLines,
      },
    },
  };

  yield* gridBot(gridBotCtx);
}

grid.displayName = "Grid Bot";
grid.description =
  "A grid trading strategy is a market-neutral approach that works by placing a series of buy and sell orders at predetermined intervals above and below the current price. It capitalizes on market volatility, aiming to profit from price fluctuations rather than predicting market direction.";
grid.hidden = true;
grid.schema = z.object({
  highPrice: z.number().positive().describe("Highest price of the grid"),
  lowPrice: z.number().positive().describe("Lowest price of the grid"),
  gridLevels: z.number().positive().describe("Number of grid lines"),
  quantityPerGrid: z.number().positive().describe("Quantity of base currency per each grid"),
});
grid.runPolicy = {
  onTradeCompleted: true,
};

export type GridBotLiteConfig = IBotConfiguration<z.infer<typeof grid.schema>>;
