import { z } from "zod";

export const ZGetOpenOrdersInputSchema = z.object({
  botId: z.number(),
});

export type TGetOpenOrdersInputSchema = z.infer<typeof ZGetOpenOrdersInputSchema>;
