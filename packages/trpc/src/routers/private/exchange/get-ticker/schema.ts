import { z } from "zod";
import { ExchangeCode } from "@opentrader/types";

export const ZGetExchangeTickerSchema = z.object({
  exchangeCode: z.nativeEnum(ExchangeCode),
  isDemoAccount: z.boolean(),
  symbol: z.string(),
});

export type TGetExchangeTickerSchema = z.infer<typeof ZGetExchangeTickerSchema>;
