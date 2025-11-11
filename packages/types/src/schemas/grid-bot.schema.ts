import { z } from "zod";
import { ZBotState } from "./bot.schema.js";

export const ZGridLineSchema = z.object({
  price: z.number(),
  quantity: z.number(),
});

export const ZGridBotSettings = z.object({
  gridLines: z.array(ZGridLineSchema),
});

export type TGridLineSchema = z.infer<typeof ZGridLineSchema>;
export type TGridBotSettings = z.infer<typeof ZGridBotSettings>;
export type TGridBotState = z.infer<typeof ZBotState>;
