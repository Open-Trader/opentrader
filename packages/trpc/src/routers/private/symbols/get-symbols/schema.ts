import { ExchangeCode } from "@opentrader/types";
import { z } from "zod";

export const ZGetSymbolsInputSchema = z.object({
  exchangeCode: z.nativeEnum(ExchangeCode),
  isDemoAccount: z.boolean(),
});

export type TGetSymbolsInputSchema = z.infer<typeof ZGetSymbolsInputSchema>;
