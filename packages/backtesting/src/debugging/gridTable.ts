import type { Trade } from "@opentrader/bot-processor";
import { XOrderStatus } from "@opentrader/types";

export function gridTable(smartTrades: Trade[]) {
  const rows = smartTrades.flatMap((smartTrade, i) => {
    const { entryOrder, tpOrder } = smartTrade;

    const isBuy = entryOrder.status === XOrderStatus.Placed && (!tpOrder || tpOrder.status === XOrderStatus.Idle);
    const isSell = entryOrder.status === XOrderStatus.Filled && tpOrder?.status === XOrderStatus.Placed;

    const prevSmartTrade = smartTrades[i - 1];
    const isCurrent = isSell && prevSmartTrade?.tpOrder?.status === XOrderStatus.Idle;

    const side = isBuy ? "buy" : isSell ? "sell" : "unknown";

    const price =
      side === "sell" ? smartTrade.tpOrder?.price : side === "buy" ? smartTrade.entryOrder.price : "unknown";

    const gridLine = {
      stIndex: i,
      ref: smartTrade.ref,
      stId: smartTrade.id,
      side,
      price,
      buy: smartTrade.entryOrder.price,
      sell: smartTrade.tpOrder?.price,
    };

    if (isCurrent) {
      const currentLine = {
        stIndex: "-",
        ref: "-",
        stId: "-",
        side: "Curr",
        price: smartTrade.entryOrder.price,
        buy: "-",
        sell: "-",
        filled: "",
      };

      return [currentLine, gridLine];
    }

    return [gridLine];
  });

  return rows.reverse();
}
