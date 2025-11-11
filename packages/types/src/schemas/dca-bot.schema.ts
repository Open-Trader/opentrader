import { z } from "zod";
import { XOrderType } from "../common/db.enums.js";
import { ZBotState } from "./bot.schema.js";

export const ZDcaBotSettings = z.object({
  entry: z.object({
    quantity: z.number().positive().describe("Quantity of the Entry Order in base currency"),
    type: z.nativeEnum(XOrderType).describe("Entry with Limit or Market order"),
    price: z.number().optional(),
    conditions: z.any().optional(),
  }),
  tp: z.object({
    percent: z.number().positive().describe("Take Profit from entry order price in %"),
  }),
  sl: z
    .object({
      percent: z.number().positive().describe("Stop Loss drop from entry order price in %"),
    })
    .optional(),
  safetyOrders: z.array(
    z.object({
      quantity: z.number().positive().positive("Quantity of the Safety Order in base currency"),
      priceDeviation: z.number().positive().positive("Price deviation from the Entry Order price in %"),
    }),
  ),
});

export const ZDcaBotSettingsRefine = ZDcaBotSettings.refine(
  ({ sl, safetyOrders }) => {
    // Validate SL: Ensure it is placed below the lowest Safety Order
    if (sl && safetyOrders.length > 0) {
      const lowestSafetyOrder = safetyOrders.reduce((acc, curr) => {
        return curr.priceDeviation > acc.priceDeviation ? curr : acc;
      });

      // Note: `percent` and `priceDeviation` are positive numbers
      if (sl.percent <= lowestSafetyOrder.priceDeviation) {
        return false;
      }
    }

    return true;
  },
  { message: `SL must be placed below the Safety Orders.` },
);

export type TDcaBotSettings = z.infer<typeof ZDcaBotSettings>;
export type TDcaBotState = z.infer<typeof ZBotState>;
