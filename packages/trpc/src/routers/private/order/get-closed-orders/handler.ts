import { toOrderEntity, toSmartTradeEntity, xprisma } from "@opentrader/db";
import type { Context } from "../../../../utils/context.js";
import type { TGetClosedOrdersInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetClosedOrdersInputSchema;
};

export async function getClosedOrders({ ctx, input }: Options) {
  const orders = await xprisma.order.findMany({
    where: {
      smartTrade: {
        owner: { id: ctx.user.id },
        bot: { id: input.botId },
      },
      status: { in: input.statuses },
    },
    include: {
      smartTrade: {
        include: {
          orders: true,
          exchangeAccount: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return orders.map((order) => ({
    ...toOrderEntity(order),
    smartTrade: toSmartTradeEntity(order.smartTrade),
  }));
}
