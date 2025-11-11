import { table } from "table";
import type { BotTemplate, IBotConfiguration, Order, Trade } from "@opentrader/bot-processor";
import { ICandlestick, XOrderStatus } from "@opentrader/types";
import { format } from "@opentrader/logger";
import { decomposeSymbol } from "@opentrader/tools";
import { buyOrder } from "./report/buyOrder.js";
import { buyTransaction } from "./report/buyTransaction.js";
import { sellOrder } from "./report/sellOrder.js";
import { sellTransaction } from "./report/sellTransaction.js";
import type { ActiveOrder, Transaction } from "./types/index.js";

type OrderInfo = Order & {
  trade: Trade;
};

export class BacktestingReport {
  constructor(
    private candlesticks: ICandlestick[],
    private smartTrades: Trade[],
    private botConfig: IBotConfiguration,
    private template: BotTemplate<any>,
  ) {}

  create(): string {
    const startDate = format.datetime(this.candlesticks[0]!.timestamp);
    const endDate = format.datetime(this.candlesticks[this.candlesticks.length - 1]!.timestamp);

    const strategyParams = JSON.stringify(this.botConfig.settings, null, 2);
    const strategyName = this.template.name;

    const exchange = this.botConfig.exchangeCode;
    const symbol = this.botConfig.symbol;
    const { baseCurrency, quoteCurrency } = decomposeSymbol(symbol);

    const backtestData: Array<any[]> = [["Date", "Action", "Price", "Quantity", "Amount", "Profit"]];

    const trades = this.getOrders().map((order) => {
      const amount = order.filledPrice! * order.trade.entryOrder.quantity;
      const profit =
        order.side === "Sell" && order.trade.tpOrder
          ? (order.trade.tpOrder.filledPrice! - order.trade.entryOrder.filledPrice!) * order.trade.entryOrder.quantity
          : "-";

      return [
        format.datetime(order.updatedAt),
        order.side.toUpperCase(),
        order.filledPrice,
        order.trade.entryOrder.quantity,
        amount,
        profit,
      ];
    });
    const tradesTable = table(backtestData.concat(trades));
    const totalProfit = this.calcTotalProfit();

    return `Backtesting done.

+------------------------+
|   Backtesting Report   |
+------------------------+

Strategy: ${strategyName}
Strategy params:
${strategyParams}

Exchange: ${exchange}
Pair: ${symbol}

Start date: ${startDate}
End date: ${endDate}

Trades:
${tradesTable}

Total Trades: ${this.smartTrades.length}
Total Profit: ${totalProfit} ${quoteCurrency}
    `;
  }

  getOrders(): Array<OrderInfo> {
    const orders: Array<OrderInfo> = [];

    for (const trade of this.getFinishedSmartTrades()) {
      orders.push({
        ...trade.entryOrder,
        trade,
      });

      if (trade.tpOrder) {
        orders.push({
          ...trade.tpOrder,
          trade,
        });
      }
    }

    return orders.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
  }

  getTransactions(): Transaction[] {
    const transactions: Transaction[] = [];

    const finishedSmartTrades = this.getFinishedSmartTrades();

    finishedSmartTrades.forEach((smartTrade) => {
      transactions.push(buyTransaction(smartTrade));

      if (smartTrade.tpOrder) {
        transactions.push(sellTransaction(smartTrade));
      }
    });

    return transactions;
  }

  getActiveOrders(): ActiveOrder[] {
    const activeOrders: ActiveOrder[] = [];

    const smartTrades = this.getActiveSmartTrades();

    smartTrades.forEach((smartTrade) => {
      activeOrders.push(buyOrder(smartTrade));

      if (smartTrade.tpOrder) {
        activeOrders.push(sellOrder(smartTrade));
      }
    });

    return activeOrders;
  }

  private calcTotalProfit(): number {
    return this.smartTrades.reduce((acc, curr) => {
      const priceDiff =
        curr.entryOrder.filledPrice && curr.tpOrder?.filledPrice
          ? curr.tpOrder.filledPrice - curr.entryOrder.filledPrice
          : 0;
      const profit = priceDiff * curr.entryOrder.quantity;

      return acc + profit;
    }, 0);
  }

  private getActiveSmartTrades() {
    return this.smartTrades.filter(
      (smartTrade) =>
        smartTrade.entryOrder.status === XOrderStatus.Placed || smartTrade.tpOrder?.status === XOrderStatus.Placed,
    );
  }

  private getFinishedSmartTrades() {
    return this.smartTrades.filter((smartTrade) => {
      return smartTrade.entryOrder.status === XOrderStatus.Filled && smartTrade.tpOrder?.status === XOrderStatus.Filled;
    });
  }
}
