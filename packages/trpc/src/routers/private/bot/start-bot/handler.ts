import { eventBus } from "@opentrader/event-bus";
import { BotService } from "../../../../services/bot.service.js";
import type { Context } from "../../../../utils/context.js";
import type { TStartGridBotInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TStartGridBotInputSchema;
};

export async function startGridBot({ input }: Options) {
  const { botId } = input;

  const botService = await BotService.fromId(botId);
  botService.assertIsNotAlreadyRunning();
  botService.assertIsNotProcessing();

  await eventBus.emit("startBot", botService.bot);

  return {
    ok: true,
  };
}
