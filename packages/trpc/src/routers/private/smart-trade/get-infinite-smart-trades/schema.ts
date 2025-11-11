import { z } from "zod";

export const ZGetInfiniteSmartTradesSchema = z.object({
  botId: z.number().optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
});

export type TGetInfiniteSmartTradesSchema = z.infer<typeof ZGetInfiniteSmartTradesSchema>;
