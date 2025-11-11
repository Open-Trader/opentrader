import { toOrderEntity, toSmartTradeEntity, xprisma } from "@opentrader/db";
import { XOrderStatus } from "@opentrader/types";
import type { Context } from "../../../../utils/context.js";
import type { TGetOpenOrdersInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetOpenOrdersInputSchema;
};

export async function getOpenOrders({ ctx, input }: Options) {
  const orders = await xprisma.order.findMany({
    where: {
      smartTrade: {
        owner: { id: ctx.user.id },
        bot: { id: input.botId },
      },
      status: XOrderStatus.Placed,
    },
    include: {
      smartTrade: {
        include: {
          orders: true,
          exchangeAccount: true,
        },
      },
    },
    orderBy: { placedAt: "desc" },
  });

  return orders.map((order) => ({
    ...toOrderEntity(order),
    smartTrade: toSmartTradeEntity(order.smartTrade),
  }));
}
