import { XOrderStatus } from "@opentrader/types";
import { z } from "zod";

export const ZGetClosedOrdersInputSchema = z.object({
  botId: z.number(),
  statuses: z
    .array(z.enum([XOrderStatus.Filled, XOrderStatus.Canceled, XOrderStatus.Deleted, XOrderStatus.Revoked]))
    .default([XOrderStatus.Filled]),
});

export type TGetClosedOrdersInputSchema = z.infer<typeof ZGetClosedOrdersInputSchema>;
