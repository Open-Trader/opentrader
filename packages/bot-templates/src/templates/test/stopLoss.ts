import { z } from "zod";
import {
  cancelSmartTrade,
  IBotConfiguration,
  type SmartTradeService,
  type TBotContext,
  useSmartTrade,
} from "@opentrader/bot-processor";
import { logger } from "@opentrader/logger";

export function* testStopLoss(ctx: TBotContext<TestStopLossSchema>) {
  logger.info("[TestStopLoss] Executing strategy template");
  const { entry, tp, sl, quantity } = ctx.config.settings;

  if (ctx.onStop) {
    logger.info("[TestStopLoss] Stopping strategy");
    yield cancelSmartTrade();
    return;
  }

  if (ctx.onStart) {
    const smartTrade: SmartTradeService = yield useSmartTrade({
      entry: {
        type: entry.type,
        side: "Buy",
      },
      tp: {
        type: tp.type,
        side: "Sell",
        price: tp.price,
      },
      sl: {
        type: sl.type,
        side: "Sell",
        stopPrice: sl.stopPrice,
        price: sl.price,
      },
      quantity,
    });
    logger.info(smartTrade, "[TestStopLoss] Trade created");
  }
}

testStopLoss.schema = z.object({
  entry: z.object({
    type: z.enum(["Market", "Limit"]).default("Market").describe("Type of the entry order."),
    price: z.number().optional().describe("Limit price of the entry order."),
  }),
  tp: z.object({
    type: z.enum(["Limit", "Market"]).default("Limit").describe("Type of the take profit order."),
    price: z.number().default(105000).describe("Limit price of the take profit order."),
  }),
  sl: z.object({
    type: z.enum(["Limit", "Market"]).default("Limit").describe("Type of the stop loss order."),
    stopPrice: z.number().default(95000).describe("Stop price of the stop loss order."),
    price: z.number().default(90000).describe("Limit price of the stop loss order."),
  }),
  quantity: z.number().default(0.0001).describe("Quantity in base currency."),
});
testStopLoss.hidden = true;
testStopLoss.watchers = {
  watchCandles: ({ symbol }: IBotConfiguration) => symbol,
};
testStopLoss.runPolicy = {
  onCandleClosed: true,
};

export type TestStopLossSchema = IBotConfiguration<z.infer<typeof testStopLoss.schema>>;
