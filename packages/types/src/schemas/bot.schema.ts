import { z } from "zod";

export const ZBotState = z.record(z.any());
export const ZBotSettings = z.record(z.any());

export type TBotSettings = z.infer<typeof ZBotSettings>;
export type TBotState = z.infer<typeof ZBotState>;
