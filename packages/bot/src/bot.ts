import { cargoQueue, QueueObject } from "async";
import { findStrategy } from "@opentrader/bot-templates/server";
import { eventBus } from "@opentrader/event-bus";
import { SmartTradeWithOrders, TBotWithExchangeAccount, xprisma } from "@opentrader/db";
import { logger } from "@opentrader/logger";
import { BotProcessing, getWatchers, shouldRunStrategy } from "./processing/index.js";
import { MarketEvent, MarketId, StrategyEvent } from "@opentrader/types";
import { MarketsStream } from "./streams/markets.stream.js";
import { OrderEvent, OrdersStream } from "./streams/orders.stream.js";
import { TradeManager } from "./trade.manager.js";
import { BotMarketStore } from "./bot-market.store.js";

type QueuePayload = StrategyEvent & { bot: TBotWithExchangeAccount; subscribedMarkets: MarketId[] }; // @todo rename to marketIds
type OnLog = (payload: QueuePayload[]) => void;

class StrategyExecutionQueue {
  private queue: QueueObject<QueuePayload>;
  private destroyed = false;

  constructor(
    private bot: TBotWithExchangeAccount,
    private store: BotMarketStore,
    private onLog?: OnLog,
    private onError?: (err: Error) => void,
  ) {
    this.queue = cargoQueue<QueuePayload>(this.processTask);
    this.queue.error(this.handleError);
  }

  enqueue(payload: QueuePayload) {
    void this.queue.push(payload);
  }

  enqueueAsync(payload: QueuePayload) {
    return this.queue.pushAsync(payload);
  }

  private processTask = async (tasks: QueuePayload[]) => {
    const task = tasks[tasks.length - 1]; // use latest event

    this.onLog?.(tasks);

    const processor = new BotProcessing(task.bot);

    await processor.process({
      triggerEventType: task.type,
      market: this.store.get(task.marketId, this.bot.exchangeAccount.isDemoAccount),
      markets: this.store.getMany(task.subscribedMarkets, this.bot.exchangeAccount.isDemoAccount),
    });

    const pendingSmartTrades = await processor.getPendingSmartTrades();
    for (const trade of pendingSmartTrades) {
      await eventBus.emit("placeTrade", trade);
    }
  };

  private handleError = (error: Error) => {
    this.onError?.(error);

    if (this.queue.paused) return;

    this.queue.pause();
    setTimeout(() => {
      if (this.destroyed) return;

      this.queue.resume();
    }, 60_000);
  };

  async destroy() {
    this.destroyed = true;

    const runningTasks = this.queue.running();
    if (runningTasks > 0) await this.queue.drain();

    this.queue.kill();
  }

  length() {
    return this.queue.length();
  }

  running() {
    return this.queue.running();
  }
}

function createQueuePayload(event: StrategyEvent, bot: TBotWithExchangeAccount): QueuePayload {
  const strategy = findStrategy(bot.template);
  const { watchOrderbook, watchCandles, watchTicker, watchTrades } = getWatchers(strategy.strategyFn, bot);
  const subscribedMarkets = [
    ...new Set([...watchOrderbook, ...watchCandles, ...watchTicker, ...watchTrades]),
  ] as MarketId[];

  return { ...event, bot, subscribedMarkets };
}

export class Bot {
  strategy: ReturnType<typeof findStrategy>;
  queue: StrategyExecutionQueue;
  marketStore = new BotMarketStore();

  stopped = false;
  intervalTimer: NodeJS.Timeout | null = null;

  constructor(
    public bot: TBotWithExchangeAccount,
    private ordersStream: OrdersStream,
    private marketsStream: MarketsStream,
    private tradeManager: TradeManager,
  ) {
    this.strategy = findStrategy(this.bot.template);
    this.queue = new StrategyExecutionQueue(
      this.bot,
      this.marketStore,
      (tasks) => {
        logger.debug(`📠 Processing ${tasks.length} task(s) for bot [${this.bot.id} - ${this.bot.name}]`);
      },
      (error) => {
        logger.error(`[StrategyExecutionQueue] An error occurred: ${error.message}. Retrying in 1 minute...`);
        logger.debug(error);
      },
    );
  }

  private handleOrderEvent = (event: OrderEvent) => {
    if (event.order.smartTrade.botId !== this.bot.id) return;

    const marketId = `${event.exchangeCode}:${event.order.smartTrade.symbol}` as MarketId;

    // Ignores "onPlaced" and "onCancelled" order events
    // Not yet supported by the StrategyRunner
    if (event.type === "onFilled") {
      this.scheduleStrategyExecution({
        type: "onOrderFilled",
        orderId: event.order.id,
        marketId,
        isDemoMarket: event.isDemoMarket,
      });
    }
  };

  private handleMarketEvent = (event: MarketEvent) => {
    this.marketStore.update(event);

    const { strategyFn } = this.strategy;
    const { watchOrderbook, watchCandles, watchTrades, watchTicker } = getWatchers(strategyFn, this.bot);
    const isWatchingOrderbook = event.type === "onOrderbookChange" && watchOrderbook.includes(event.marketId);
    const isWatchingTicker = event.type === "onTickerChange" && watchTicker.includes(event.marketId);
    const isWatchingTrades = event.type === "onPublicTrade" && watchTrades.includes(event.marketId);
    const isWatchingCandles = event.type === "onCandleClosed" && watchCandles.includes(event.marketId);
    const isWatchingAny = isWatchingOrderbook || isWatchingTicker || isWatchingTrades || isWatchingCandles;

    if (isWatchingAny) {
      this.scheduleStrategyExecution(event);
    }
  };

  private handleTradeCompletedEvent = (trade: SmartTradeWithOrders) => {
    if (trade.botId !== this.bot.id) return;

    const marketId = `${trade.exchangeAccount.exchangeCode}:${trade.symbol}` as MarketId;
    this.scheduleStrategyExecution({
      type: "onTradeCompleted",
      tradeId: trade.id,
      marketId,
      isDemoMarket: trade.exchangeAccount.isDemoAccount,
    });
  };

  private scheduleStrategyExecution = (event: StrategyEvent) => {
    const { strategyFn } = this.strategy;
    const queuePayload = createQueuePayload(event, this.bot);

    if (shouldRunStrategy(strategyFn, this.bot, queuePayload.type)) {
      this.queue.enqueue(queuePayload);
    }
  };

  private setupInterval() {
    if (!this.strategy.strategyFn.interval) return;

    const marketId = `${this.bot.exchangeAccount.exchangeCode}:${this.bot.symbol}` as MarketId;

    this.intervalTimer = setInterval(() => {
      this.scheduleStrategyExecution({
        type: "onInterval",
        marketId,
        isDemoMarket: this.bot.exchangeAccount.isDemoAccount,
      });
    }, this.strategy.strategyFn.interval);
  }

  private clearInterval() {
    if (this.intervalTimer) clearTimeout(this.intervalTimer);
  }

  async start() {
    await eventBus.emit("onBeforeBotStarted", this.bot);

    // 1. Exec "start" on the strategy fn
    const botProcessor = new BotProcessing(this.bot);
    await botProcessor.processStartCommand();

    this.bot = await xprisma.bot.custom.update({
      where: { id: this.bot.id },
      data: { enabled: true },
      include: { exchangeAccount: true },
    });

    // 2. Place pending trades
    const pendingSmartTrades = await botProcessor.getPendingSmartTrades();
    for (const trade of pendingSmartTrades) {
      await eventBus.emit("placeTrade", trade);
    }

    // 3. Subscribe to Market and Order events
    await this.marketsStream.add(this.bot);
    this.ordersStream.on("order", this.handleOrderEvent);
    this.marketsStream.on("market", this.handleMarketEvent);
    eventBus.on("onTradeCompleted", this.handleTradeCompletedEvent);

    await eventBus.emit("onBotStarted", this.bot);

    // 4. Set interval
    this.setupInterval();
  }

  async stop() {
    logger.info(
      `Stopping bot [${this.bot.id} - ${this.bot.name}]. Running tasks: ${this.queue.running()}, Pending tasks: ${this.queue.length()}`,
    );
    const t0 = Date.now();
    await eventBus.emit("onBeforeBotStopped", this.bot);

    // Clear interval
    this.clearInterval();

    // Unsubscribe from Market and Order channels
    this.ordersStream.off("order", this.handleOrderEvent);
    this.marketsStream.off("market", this.handleMarketEvent);
    eventBus.off("onTradeCompleted", this.handleTradeCompletedEvent);

    // Stop execution queue
    await this.queue.destroy();

    // Stop all trades executors
    const trades = this.tradeManager.trades.filter((trade) => trade.smartTrade.botId === this.bot.id);
    for (const trade of trades) {
      trade.destroy();
    }

    // Mark the bot as disabled
    this.bot = await xprisma.bot.custom.update({
      where: { id: this.bot.id },
      data: { enabled: false, processing: false },
      include: { exchangeAccount: true },
    });

    // Exec "stop" on the strategy fn
    const botProcessor = new BotProcessing(this.bot);
    await botProcessor.processStopCommand();

    const t1 = Date.now();
    const duration = Math.round(t1 - t0);
    logger.info(`Bot [${this.bot.id} - ${this.bot.name}] stopped (+${duration}ms)`);
    await eventBus.emit("onBotStopped", this.bot);
  }
}
