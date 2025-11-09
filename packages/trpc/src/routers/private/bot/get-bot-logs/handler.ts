import { xprisma, TBotLog } from "@opentrader/db";
import { MarketData, StrategyAction, StrategyError, StrategyEventType } from "@opentrader/types";
import type { Context } from "../../../../utils/context.js";
import type { TGetBotLogs } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetBotLogs;
};

const parseJson = <T>(context: string | null | undefined) => {
  try {
    return context ? (JSON.parse(context) as T) : undefined;
  } catch (err) {
    return undefined;
  }
};

export async function getBotLogs({ input }: Options) {
  const { cursor } = input;
  const limit = input.limit ?? 50;
  const items = await xprisma.botLog.findMany({
    take: limit + 1, // get an extra item at the end which we'll use as next cursor
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      bot: { id: input.botId },
    },
    orderBy: { createdAt: "desc" },
  });

  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    const nextItem = items.pop();
    nextCursor = nextItem!.id;
  }

  const logs: TBotLog[] = items.map((log) => ({
    ...log,
    action: log.action as StrategyAction,
    triggerEventType: log.triggerEventType as StrategyEventType,
    context: parseJson<MarketData>(log.context),
    error: parseJson<StrategyError>(log.error),
  }));

  return {
    items: logs,
    nextCursor,
  };
}
