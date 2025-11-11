import { toSmartTradeEntity, xprisma } from "@opentrader/db";
import { XSmartTradeType } from "@opentrader/types";
import type { Context } from "../../../../utils/context.js";
import { TGetDcaBotTradesSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetDcaBotTradesSchema;
};

export async function getTrades({ ctx, input }: Options) {
  const trades = await xprisma.smartTrade.findMany({
    where: {
      type: XSmartTradeType.DCA,
      owner: { id: ctx.user.id },
      bot: { id: input.botId },
    },
    include: {
      orders: true,
      exchangeAccount: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return trades.map(toSmartTradeEntity);
}
