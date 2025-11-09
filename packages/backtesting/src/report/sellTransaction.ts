import { Trade } from "@opentrader/bot-processor";
import { OrderSideEnum } from "@opentrader/types";
import type { SellTransaction } from "../types/index.js";

export function sellTransaction(smartTrade: Trade): SellTransaction {
  const { entryOrder, tpOrder, id } = smartTrade;

  return {
    smartTradeId: id,
    side: OrderSideEnum.Sell,
    quantity: entryOrder.quantity,
    buy: {
      price: entryOrder.filledPrice || entryOrder.price || 0,
      fee: 0, // @todo fee
      updatedAt: entryOrder.updatedAt.getTime(),
    },
    sell: {
      price: tpOrder!.filledPrice || tpOrder!.price || 0,
      fee: 0, // @todo fee
      updatedAt: tpOrder!.updatedAt.getTime(),
    },
    profit: 0, // @todo profit
  };
}
