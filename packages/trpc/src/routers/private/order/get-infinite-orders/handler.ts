import { toOrderEntity, toSmartTradeEntity, xprisma } from "@opentrader/db";
import type { Context } from "../../../../utils/context.js";
import type { TGetInfiniteOrdersInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetInfiniteOrdersInputSchema;
};

export async function getInfiniteOrders({ ctx, input }: Options) {
  const { cursor } = input;
  const limit = input.limit ?? 50;
  const items = await xprisma.order.findMany({
    take: limit + 1, // get an extra item at the end which we'll use as next cursor
    cursor: cursor ? { id: cursor } : undefined,
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

  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem!.id;
  }

  return {
    items: items.map((order) => ({
      ...toOrderEntity(order),
      smartTrade: toSmartTradeEntity(order.smartTrade),
    })),
    nextCursor,
  };
}
