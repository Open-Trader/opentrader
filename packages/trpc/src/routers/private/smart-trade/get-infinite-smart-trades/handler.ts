import { xprisma, toSmartTradeEntity } from "@opentrader/db";
import type { TGetInfiniteSmartTradesSchema } from "./schema.js";
import type { Context } from "../../../../utils/context.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetInfiniteSmartTradesSchema;
};

export async function getInfiniteSmartTrades({ ctx, input }: Options) {
  const { cursor } = input;
  const limit = input.limit ?? 50;
  const items = await xprisma.smartTrade.findMany({
    take: limit + 1, // get an extra item at the end which we'll use as next cursor
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      owner: { id: ctx.user.id },
      bot: { id: input.botId },
    },
    include: {
      orders: true,
      exchangeAccount: true,
    },
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem!.id;
  }

  return {
    items: items.map((smartTrade) => toSmartTradeEntity(smartTrade)),
    nextCursor,
  };
}
