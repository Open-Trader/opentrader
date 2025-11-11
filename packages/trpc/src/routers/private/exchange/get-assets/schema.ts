import { z } from "zod";

export const ZGetExchangeAssetsSchema = z.object({
  exchangeAccountId: z.number(),
});

export type TGetExchangeAssetsSchema = z.infer<typeof ZGetExchangeAssetsSchema>;
