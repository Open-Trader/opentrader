import { TRPCError } from "@trpc/server";
import { xprisma } from "@opentrader/db";
import { ZDcaBotSettingsRefine } from "@opentrader/types";
import { BotService } from "../../../../services/bot.service.js";
import type { Context } from "../../../../utils/context.js";
import type { TUpdateDcaBotInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TUpdateDcaBotInputSchema;
};

export async function updateDcaBot({ ctx, input }: Options) {
  const { botId, data } = input;

  const botService = await BotService.fromId(botId);
  botService.assertIsNotAlreadyRunning();
  botService.assertIsNotProcessing();

  const parsed = ZDcaBotSettingsRefine.safeParse(data.settings);
  if (!parsed.success) {
    throw new TRPCError({
      message: `Invalid strategy params: ${parsed.error.message}`,
      code: "PARSE_ERROR",
    });
  }

  const bot = await xprisma.bot.dca.update({
    where: {
      id: botId,
      owner: {
        id: ctx.user.id,
      },
    },
    data: {
      ...data,
      settings: JSON.stringify(data.settings),
    },
  });

  return bot;
}
