import { isValidSymbolId } from "@opentrader/tools";
import { z } from "zod";

export const ZGetSymbolPriceInputSchema = z.object({
  symbolId: z.string().refine((value) => isValidSymbolId(value), {
    message: "Invalid symbolId (e.g. of a valid one OKX:ETH/USDT)",
  }),
  isDemoAccount: z.boolean(),
});

export type TGetSymbolPriceInputSchema = z.infer<typeof ZGetSymbolPriceInputSchema>;
