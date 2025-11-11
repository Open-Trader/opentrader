import type { Trade } from "@opentrader/bot-processor";
import { OrderSideEnum } from "@opentrader/types";
import type { BuyTransaction } from "../types/index.js";

export function buyTransaction(smartTrade: Trade): BuyTransaction {
  const { entryOrder, tpOrder, id } = smartTrade;

  return {
    smartTradeId: id,
    side: OrderSideEnum.Buy,
    quantity: entryOrder.quantity,
    buy: {
      price: entryOrder.filledPrice || entryOrder.price || 0,
      fee: 0, // @todo fee
      updatedAt: entryOrder.updatedAt.getTime(),
    },

    sell: tpOrder
      ? {
          price: tpOrder.filledPrice || tpOrder.price || 0,
          fee: 0, // @todo fee
          updatedAt: tpOrder.updatedAt.getTime(),
        }
      : undefined,
    profit: 0,
  };
}
