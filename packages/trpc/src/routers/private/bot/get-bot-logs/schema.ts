import { z } from "zod";

export const ZGetBotLogs = z.object({
  botId: z.number(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
});

export type TGetBotLogs = z.infer<typeof ZGetBotLogs>;
