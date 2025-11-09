import { z } from "zod";

export const ZGetGridBotFormOptionsInputSchema = z.object({
  symbolId: z.string(),
  isDemoAccount: z.boolean(),
});

export type TGetGridBotFormOptionsInputSchema = z.infer<typeof ZGetGridBotFormOptionsInputSchema>;
