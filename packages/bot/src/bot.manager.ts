import { xprisma } from "@opentrader/db";
import { logger } from "@opentrader/logger";
import { Bot } from "./bot.js";
import { MarketsStream } from "./streams/markets.stream.js";
import { OrdersStream } from "./streams/orders.stream.js";
import { TradeManager } from "./trade.manager.js";

export class BotManager {
  bots: Bot[] = [];

  constructor(
    private ordersStream: OrdersStream,
    private marketsStream: MarketsStream,
    private tradeManager: TradeManager,
  ) {}

  async start(id: number) {
    if (this.bots.some((bot) => bot.bot.id === id)) {
      throw new Error(`Bot with id ${id} is already running`);
    }

    const data = await xprisma.bot.custom.findUniqueOrThrow({
      where: { id },
      include: { exchangeAccount: true },
    });

    const bot = new Bot(data, this.ordersStream, this.marketsStream, this.tradeManager);

    try {
      await bot.start();
      this.bots.push(bot);
    } catch (err) {
      logger.warn(
        `An error occurred while starting the bot [id=${bot.bot.id} name=${bot.bot.name}]. Error: ${err}. Stopping...`,
      );
      await bot.stop();
      logger.info(`Bot [id=${bot.bot.id} name=${bot.bot.name}] has been stopped`);

      throw err; // broadcast the error to tRPC
    }
  }

  async stop(id: number) {
    const bot = this.bots.find((bot) => bot.bot.id === id);

    if (!bot) {
      logger.warn(`Looks like the bot with id ${id} has an invalid state. Performing cleanup...`);
      const data = await xprisma.bot.custom.findUniqueOrThrow({
        where: { id },
        include: { exchangeAccount: true },
      });
      const bot = new Bot(data, this.ordersStream, this.marketsStream, this.tradeManager);
      await bot.stop();

      return;
    }

    await bot.stop();
    this.bots = this.bots.filter((b) => b.bot.id !== id);

    await this.marketsStream.clean(this.bots.map((b) => b.bot));
  }

  /**
   * Stop all bots gracefully.
   * Does execute "stop" command on each bot, and then sets the bot status as disabled.
   */
  async stopAll() {
    if (this.bots.length === 0) return;

    logger.info(`Stopping ${this.bots.length} bots gracefully…`);
    for (const bot of this.bots) {
      await bot.stop();
      logger.info(`Bot stopped [id=${bot.bot.id} name=${bot.bot.name}]`);
    }

    this.bots = [];
  }
}
