import { z } from "zod";
import { XOrderStatus } from "@opentrader/types";

export const ZGetInfiniteOrdersInputSchema = z.object({
  botId: z.number(),
  statuses: z.array(z.nativeEnum(XOrderStatus)).default(Object.values(XOrderStatus)),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
});

export type TGetInfiniteOrdersInputSchema = z.infer<typeof ZGetInfiniteOrdersInputSchema>;
