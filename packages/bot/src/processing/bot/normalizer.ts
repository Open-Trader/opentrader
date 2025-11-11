import {
  Trade as StrategyTrade,
  Order as StrategyOrder,
  CreateOrder as StrategyCreateOrder,
  CreateTrade as StrategyCreateTrade,
} from "@opentrader/bot-processor";
import type { SmartTradeWithOrders, TBot } from "@opentrader/db";
import { Order, Prisma } from "@prisma/client";
import {
  OrderType,
  XEntityType,
  XEntryType,
  XOrderSide,
  XOrderStatus,
  XOrderType,
  XSmartTradeType,
  XTakeProfitType,
} from "@opentrader/types";
import { nullToUndefined, required } from "../utils/index.js";

export class OrderNormalizer {
  static normalize(order: Order): StrategyOrder {
    const quantityExecuted = order.status === XOrderStatus.Filled ? order.quantity : 0;
    const filledOrLimitPrice = order.filledPrice || order.price || 0;
    const volume = order.quantity * filledOrLimitPrice;
    const volumeExecuted = order.status === XOrderStatus.Filled ? volume : 0;

    return {
      ...order,
      type: order.type as XOrderType,
      side: order.side as XOrderSide,
      status: order.status as XOrderStatus,
      entityType: order.entityType as XEntityType,
      quantityExecuted,
      volume,
      volumeExecuted,
      price: nullToUndefined(order.price),
      stopPrice: nullToUndefined(order.stopPrice),
      relativePrice: nullToUndefined(order.relativePrice),
      filledPrice: nullToUndefined(order.filledPrice),
      exchangeOrderId: nullToUndefined(order.exchangeOrderId),
      fee: nullToUndefined(order.fee),
      placedAt: nullToUndefined(order.placedAt),
      syncedAt: nullToUndefined(order.syncedAt),
      filledAt: nullToUndefined(order.filledAt),
    };
  }

  static fromPayload(
    order: StrategyCreateOrder,
    meta: { entityType: XEntityType; symbol: string; exchangeAccountId: number },
  ): Prisma.OrderCreateManySmartTradeInput {
    return {
      status: order.status,
      type: order.type || OrderType.Limit,
      entityType: meta.entityType,
      price: order.price,
      stopPrice: order.stopPrice,
      relativePrice: order.relativePrice,
      // The BUY order price with status Filled is introduced by the user,
      // so we must believe that he bought that asset at a specified price
      filledPrice: order.status === "Filled" ? order.price : null,
      filledAt: order.status === "Filled" ? new Date() : null,
      placedAt: order.status === "Placed" || order.status === "Filled" ? new Date() : null,
      symbol: meta.symbol,
      side: order.side,
      quantity: order.quantity,
      exchangeAccountId: order.exchangeAccountId || meta.exchangeAccountId,
    };
  }
}

export class SmartTradeNormalizer {
  static normalize(smartTrade: SmartTradeWithOrders, meta: { ref: string }): StrategyTrade {
    const { orders } = smartTrade;

    const entryOrder = orders.find((order) => order.entityType === XEntityType.EntryOrder);
    const tpOrder = orders.find((order) => order.entityType === XEntityType.TakeProfitOrder);
    const safetyOrders = orders.filter((order) => order.entityType === XEntityType.SafetyOrder);

    switch (smartTrade.type as XSmartTradeType) {
      case "Trade":
        return {
          ...smartTrade,
          type: XSmartTradeType.Trade,
          ref: meta.ref,
          entryOrder: OrderNormalizer.normalize(required(entryOrder, "entryOrder")),
          tpOrder: tpOrder ? OrderNormalizer.normalize(tpOrder) : undefined,
          orders: orders.map(OrderNormalizer.normalize),
        };
      case "ARB":
        return {
          ...smartTrade,
          type: XSmartTradeType.ARB,
          ref: meta.ref,
          entryOrder: OrderNormalizer.normalize(required(entryOrder, "entryOrder")),
          tpOrder: OrderNormalizer.normalize(required(tpOrder, "tpOrder")),
          orders: orders.map(OrderNormalizer.normalize),
        };
      case "DCA":
        return {
          ...smartTrade,
          type: XSmartTradeType.DCA,
          ref: meta.ref,
          entryOrder: OrderNormalizer.normalize(required(entryOrder, "entryOrder")),
          tpOrder: OrderNormalizer.normalize(required(tpOrder, "tpOrder")),
          safetyOrders: safetyOrders.map(OrderNormalizer.normalize),
          orders: orders.map(OrderNormalizer.normalize),
        };
    }
  }

  static fromPayload(
    trade: StrategyCreateTrade,
    bot: Pick<TBot, "id" | "symbol" | "exchangeAccountId" | "ownerId">,
    ref: string,
  ): Prisma.SmartTradeCreateInput {
    const exchangeAccountId = bot.exchangeAccountId;
    const symbol = trade.entry.symbol || bot.symbol;

    const entryOrder = OrderNormalizer.fromPayload(trade.entry, {
      entityType: "EntryOrder",
      symbol,
      exchangeAccountId,
    });
    const tpOrder = trade.tp
      ? OrderNormalizer.fromPayload(trade.tp, {
          entityType: "TakeProfitOrder",
          symbol,
          exchangeAccountId,
        })
      : null;
    const slOrder =
      "sl" in trade && trade.sl
        ? OrderNormalizer.fromPayload(trade.sl, {
            entityType: "StopLossOrder",
            symbol,
            exchangeAccountId,
          })
        : null;
    const safetyOrders =
      trade.type === "DCA"
        ? trade.safetyOrders.map((order) =>
            OrderNormalizer.fromPayload(order, {
              entityType: "SafetyOrder",
              symbol,
              exchangeAccountId,
            }),
          )
        : [];

    const orders = [entryOrder, tpOrder, slOrder, ...safetyOrders].filter((order) => !!order);
    return {
      entryType: XEntryType.Order,
      takeProfitType: tpOrder ? XTakeProfitType.Order : XTakeProfitType.None,

      ref,
      type: trade.type,
      symbol,

      orders: {
        createMany: { data: orders },
      },

      exchangeAccount: { connect: { id: exchangeAccountId } },
      owner: { connect: { id: bot.ownerId } },
      bot: { connect: { id: bot.id } },
    };
  }
}
