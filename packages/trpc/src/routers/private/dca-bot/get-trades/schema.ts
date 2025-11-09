import { z } from "zod";

export const ZGetDcaBotTradesSchema = z.object({
  botId: z.number().optional(),
});

export type TGetDcaBotTradesSchema = z.infer<typeof ZGetDcaBotTradesSchema>;
