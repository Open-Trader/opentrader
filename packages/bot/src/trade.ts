import { InsufficientFunds } from "ccxt";
import { cargoQueue, QueueObject } from "async";
import { type ExchangeAccountWithCredentials, SmartTradeWithOrders, xprisma } from "@opentrader/db";
import { eventBus } from "@opentrader/event-bus";
import { exchangeProvider, IExchange } from "@opentrader/exchanges";
import { logger } from "@opentrader/logger";
import { SmartTradeExecutor } from "./processing/index.js";
import { ITicker } from "@opentrader/types";
import { TickerChannel, TickerEvent } from "./channels/ticker/index.js";
import { OrderEvent, OrdersStream } from "./streams/orders.stream.js";

type TradeUpdatedEvent = { type: "onTradeUpdated" };
type TickerChangeEvent = { type: "onTickerChange"; ticker: ITicker };
type ExchangeEvent = OrderEvent | TickerChangeEvent | TradeUpdatedEvent;
type QueueEvent = ExchangeEvent & { smartTrade: SmartTradeWithOrders };

export class Trade {
  exchangeAccount: ExchangeAccountWithCredentials;
  exchange: IExchange;
  queue: QueueObject<QueueEvent>;
  tickerChannel: TickerChannel;
  destroyed = false;

  constructor(
    public smartTrade: SmartTradeWithOrders,
    private ordersStream: OrdersStream,
  ) {
    this.exchangeAccount = smartTrade.exchangeAccount as ExchangeAccountWithCredentials; // hacky cast
    this.exchange = exchangeProvider.fromAccount(this.exchangeAccount);

    this.tickerChannel = new TickerChannel(this.smartTrade.symbol, this.exchange);

    this.queue = cargoQueue<QueueEvent>(this.queueHandler);
    this.queue.error((err) => {
      if (this.queue.paused) return;

      if (err instanceof InsufficientFunds) {
        logger.warn(`Insufficient funds to place the order: ${err.message}. Retrying in 1 minute...`);
      } else {
        logger.error(err, `[TradeQueue] An error occurred: ${err.message}. Retrying in 1 minute...`);
      }

      this.queue.pause();
      setTimeout(() => {
        if (!this.destroyed) this.queue.resume();
      }, 60_000);
    });
  }

  async place() {
    const executor = SmartTradeExecutor.create(this.smartTrade, this.exchangeAccount);
    await executor.next();

    this.smartTrade = await this.pull();

    // Init only after the initial order was placed
    this.init();
  }

  async cancel() {
    this.destroy();

    this.smartTrade = await this.pull();
    const executor = SmartTradeExecutor.create(this.smartTrade, this.exchangeAccount);
    await executor.cancelOrders();
  }

  init() {
    this.ordersStream.on("order", this.handleOrderEvent);
    this.tickerChannel.on("ticker", this.handleTickerEvent);
    this.tickerChannel.init();
  }

  destroy() {
    this.ordersStream.off("order", this.handleOrderEvent);
    this.tickerChannel.off("ticker", this.handleTickerEvent);
    this.tickerChannel.stop();
    this.queue.kill();
    this.destroyed = true;
  }

  async next() {
    await this.queue.push({ type: "onTradeUpdated", smartTrade: this.smartTrade });
  }

  queueHandler = async (tasks: QueueEvent[]) => {
    const event = tasks[tasks.length - 1]; // getting last task from the queue

    this.smartTrade = await this.pull();

    const executor = SmartTradeExecutor.create(this.smartTrade, this.exchangeAccount);

    switch (event.type) {
      case "onFilled":
        await executor.onOrderFilled?.(event.order);
        break;
      case "onTickerChange":
        await executor.onTicker?.(event.ticker);
        break;
      case "onTradeUpdated":
        await executor.next();
        break;
    }

    if (executor.status === "Finished") {
      this.destroy();
      await eventBus.emit("onTradeCompleted", executor.smartTrade);
    }
  };

  handleOrderEvent = async (event: OrderEvent) => {
    if (event.order.smartTrade.id !== this.smartTrade.id) {
      return; // ignore others smart trades
    }

    void this.queue.push({ ...event, smartTrade: this.smartTrade });
  };

  handleTickerEvent = async (event: TickerEvent) => {
    void this.queue.push({ type: "onTickerChange", ticker: event.ticker, smartTrade: this.smartTrade });
  };

  private async pull() {
    this.smartTrade = await xprisma.smartTrade.findUniqueOrThrow({
      where: { id: this.smartTrade.id },
      include: { orders: true, exchangeAccount: true },
    });

    return this.smartTrade;
  }
}
