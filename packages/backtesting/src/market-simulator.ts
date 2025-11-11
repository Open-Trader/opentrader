import type { Trade } from "@opentrader/bot-processor";
import { ICandlestick, XOrderStatus } from "@opentrader/types";
import { format, logger } from "@opentrader/logger";

export class MarketSimulator {
  /**
   * Current candlestick
   */
  public candlestick: ICandlestick | null = null;
  public smartTrades: Trade[] = [];

  get currentCandle(): ICandlestick {
    if (!this.candlestick) throw new Error("Data.candlestick is undefined");

    return this.candlestick;
  }

  nextCandle(candlestick: ICandlestick) {
    this.candlestick = candlestick;
  }

  /**
   * @internal
   */
  addSmartTrade(smartTrade: Trade, ref: string) {
    // remove existing refs to avoid duplicates
    this.smartTrades = this.smartTrades.map((smartTrade) => {
      if (smartTrade.ref === ref) {
        return {
          ...smartTrade,
          ref: "",
        };
      }

      return smartTrade;
    });

    this.smartTrades.push(smartTrade);
  }

  editSmartTrade(newSmartTrade: Trade, ref: string) {
    this.smartTrades = this.smartTrades.map((smartTrade) => {
      if (smartTrade.ref === ref) {
        return newSmartTrade;
      }

      return smartTrade;
    });
  }

  /**
   * Changes the order status from: `idle -> placed`
   * Return `true` if any order was placed
   */
  placeOrders() {
    return this.smartTrades.map((smartTrade) => this.placeOrder(smartTrade)).some((value) => value);
  }

  /**
   * Changed orders statuses from `placed -> filled`
   * Return `true` if any order was fulfilled
   */
  fulfillOrders(): boolean {
    return this.smartTrades.map((smartTrade) => this.fulfillOrder(smartTrade)).some((value) => value);
  }

  /**
   * Mark `idle` order as `placed`
   * @param smartTrade - SmartTrade
   */
  private placeOrder(smartTrade: Trade): boolean {
    // Update orders statuses from Idle to Placed

    if (smartTrade.entryOrder && smartTrade.entryOrder.status === XOrderStatus.Idle) {
      smartTrade.entryOrder = {
        ...smartTrade.entryOrder,
        status: XOrderStatus.Placed,
      };

      return true;
    } else if (
      smartTrade.tpOrder &&
      smartTrade.tpOrder.status === XOrderStatus.Idle &&
      (!smartTrade.entryOrder || smartTrade.entryOrder.status === XOrderStatus.Filled)
    ) {
      smartTrade.tpOrder = {
        ...smartTrade.tpOrder,
        status: XOrderStatus.Placed,
      };

      return true;
    }

    return false;
  }

  /**
   * Update order statue to "Filled" based on current asset price:
   * - `placed -> filled`
   * @param smartTrade - SmartTrade
   * @returns Returns `true` if order was fulfilled
   */
  private fulfillOrder(smartTrade: Trade): boolean {
    const candlestick = this.currentCandle;

    const updatedAt = new Date(candlestick.timestamp);

    if (smartTrade.entryOrder && smartTrade.entryOrder.status === XOrderStatus.Placed) {
      if (smartTrade.entryOrder.type === "Market") {
        const filledOrder = {
          ...smartTrade.entryOrder,
          status: XOrderStatus.Filled,
          filledPrice: candlestick.close,
          updatedAt,
        };
        smartTrade.entryOrder = filledOrder;

        logger.info(
          `[MarketSimulator] Market BUY order was filled at ${filledOrder.filledPrice} on ${format.datetime(updatedAt)}`,
        );

        return true;
      } else if (smartTrade.entryOrder.type === "Limit") {
        if (candlestick.close <= smartTrade.entryOrder.price!) {
          const filledOrder = {
            ...smartTrade.entryOrder,
            status: XOrderStatus.Filled,
            filledPrice: smartTrade.entryOrder.price,
            updatedAt,
          };
          smartTrade.entryOrder = filledOrder;

          logger.info(
            `[MarketSimulator] Limit BUY order was filled at ${filledOrder.filledPrice} on ${format.datetime(updatedAt)}`,
          );
          return true;
        }
      }
    }

    if (smartTrade.tpOrder && smartTrade.tpOrder.status === XOrderStatus.Placed) {
      if (smartTrade.tpOrder.type === "Market") {
        const filledOrder = {
          ...smartTrade.tpOrder,
          status: XOrderStatus.Filled,
          filledPrice: candlestick.close,
          updatedAt,
        };
        smartTrade.tpOrder = filledOrder;

        logger.info(
          `[MarketSimulator] Market SELL order was filled at ${filledOrder.filledPrice} on ${format.datetime(updatedAt)}`,
        );
        return true;
      } else if (smartTrade.tpOrder.type === "Limit") {
        if (candlestick.close >= smartTrade.tpOrder.price!) {
          const filledOrder = {
            ...smartTrade.tpOrder,
            status: XOrderStatus.Filled,
            filledPrice: smartTrade.tpOrder.price,
            updatedAt,
          };

          smartTrade.tpOrder = filledOrder;

          logger.info(
            `[MarketSimulator] Limit SELL order was filled at ${filledOrder.filledPrice} on ${format.datetime(updatedAt)}`,
          );
          return true;
        }
      }
    }

    return false;
  }
}
