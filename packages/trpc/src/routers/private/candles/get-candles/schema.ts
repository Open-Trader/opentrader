import { z } from "zod";
import { BarSize, ExchangeCode } from "@opentrader/types";

export const ZGetCandlesInputSchema = z.object({
  exchangeCode: z.nativeEnum(ExchangeCode),
  symbol: z.string(),
  barSize: z.nativeEnum(BarSize),
  since: z.number().describe("Timestamp in ms"),
  limit: z.number().optional(),
  isDemoAccount: z.boolean(),
});

export type TGetCandlesInputSchema = z.infer<typeof ZGetCandlesInputSchema>;
