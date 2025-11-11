import { z } from "zod";

import { BarSize, ZBotSettings } from "@opentrader/types";

export const ZBacktestInputSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),

  exchangeAccountId: z.number(),
  symbol: z.string(),
  timeframe: z.nativeEnum(BarSize),
  template: z.string(), // strategy template
  settings: ZBotSettings,
});

export type TBacktestInputSchema = z.infer<typeof ZBacktestInputSchema>;
