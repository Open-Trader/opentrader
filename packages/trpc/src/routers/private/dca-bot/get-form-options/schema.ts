import { z } from "zod";

export const ZGetDcaBotFormOptionsInputSchema = z.object({
  symbolId: z.string(),
  isDemoAccount: z.boolean(),
});

export type TGetDcaBotFormOptionsInputSchema = z.infer<typeof ZGetDcaBotFormOptionsInputSchema>;
