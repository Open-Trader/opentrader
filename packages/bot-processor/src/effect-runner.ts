/**
 * Copyright 2024 bludnic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Repository URL: https://github.com/bludnic/opentrader
 */
import { rsi, ema, sma } from "@opentrader/indicators";
import { aggregateCandles, IndicatorsValues } from "@opentrader/tools";
import { XOrderSide, XOrderStatus, XOrderType } from "@opentrader/types";
import { SmartTradeService } from "./types/index.js";
import type { TBotContext } from "./types/index.js";
import {
  BaseEffect,
  CANCEL_ALL_TRADES,
  EffectType,
  GET_OPEN_TRADES,
  USE_DCA,
  USE_INDICATOR,
} from "./effects/types/index.js";
import {
  buy,
  useTrade,
  useArbTrade,
  sell,
  useExchange,
  useSmartTrade,
  getSmartTrade,
  cancelSmartTrade,
  createSmartTrade,
  replaceSmartTrade,
  useMarket,
  useCandle,
  useRSI,
  useDca,
  useIndicator,
  useIndicators,
  getOpenTrades,
  cancelAllTrades,
  CancelAllTradesResult,
  all,
  isEffect,
} from "./effects/index.js";
import {
  ALL,
  BUY,
  CANCEL_SMART_TRADE,
  CREATE_SMART_TRADE,
  GET_SMART_TRADE,
  REPLACE_SMART_TRADE,
  SELL,
  USE_EXCHANGE,
  USE_INDICATORS,
  USE_SMART_TRADE,
  USE_TRADE,
  USE_ARB_TRADE,
  USE_MARKET,
  USE_CANDLE,
  USE_RSI_INDICATOR,
} from "./effects/index.js";

export const effectRunnerMap: Record<
  EffectType,
  (effect: BaseEffect<any, any, any>, ctx: TBotContext<any>) => unknown
> = {
  [ALL]: runAllEffect,
  [USE_SMART_TRADE]: runUseSmartTradeEffect,
  [GET_SMART_TRADE]: runGetSmartTradeEffect,
  [CANCEL_SMART_TRADE]: runCancelSmartTradeEffect,
  [CREATE_SMART_TRADE]: runCreateSmartTradeEffect,
  [REPLACE_SMART_TRADE]: runReplaceSmartTradeEffect,
  [USE_TRADE]: runUseTradeEffect,
  [USE_ARB_TRADE]: runUseArbTradeEffect,
  [USE_DCA]: runUseDcaEffect,
  [BUY]: runBuyEffect,
  [SELL]: runSellEffect,
  [GET_OPEN_TRADES]: runGetOpenTradesEffect,
  [CANCEL_ALL_TRADES]: runCancelAllTradesEffect,
  [USE_EXCHANGE]: runUseExchangeEffect,
  [USE_INDICATOR]: runUseIndicatorEffect,
  [USE_INDICATORS]: runUseIndicatorsEffect,
  [USE_MARKET]: runUseMarketEffect,
  [USE_CANDLE]: runUseCandleEffect,
  [USE_RSI_INDICATOR]: runUseRsiIndicatorEffect,
};

export async function runAllEffect(effect: ReturnType<typeof all>, ctx: TBotContext<any>): Promise<Array<unknown>> {
  const promises = [];
  for (const task of effect.payload) {
    if (task instanceof Promise) {
      promises.push(task);
    } else if (isEffect(task)) {
      const effectRunner = effectRunnerMap[task.type];
      promises.push(effectRunner(task, ctx));
    } else {
      console.log("Unsupported effect in yield all()", task);
      throw new Error("Unsupported effect in yield all()");
    }
  }

  return Promise.all(promises);
}

export async function runUseSmartTradeEffect(
  effect: ReturnType<typeof useSmartTrade>,
  ctx: TBotContext<any>,
): Promise<SmartTradeService> {
  const { entry, tp, sl, quantity } = effect.payload;
  const smartTrade = await ctx.control.getOrCreateSmartTrade(effect.ref, {
    type: "Trade",
    entry: { quantity, ...entry },
    tp: tp ? { quantity, ...tp } : undefined,
    sl: sl ? { quantity, ...sl } : undefined,
  });

  return new SmartTradeService(effect.ref, smartTrade);
}

async function runGetSmartTradeEffect(effect: ReturnType<typeof getSmartTrade>, ctx: TBotContext<any>) {
  const smartTrade = await ctx.control.getSmartTrade(effect.ref);

  return smartTrade ? new SmartTradeService(effect.ref, smartTrade) : null;
}

async function runCancelSmartTradeEffect(effect: ReturnType<typeof cancelSmartTrade>, ctx: TBotContext<any>) {
  return ctx.control.cancelSmartTrade(effect.ref);
}

async function runCreateSmartTradeEffect(effect: ReturnType<typeof createSmartTrade>, ctx: TBotContext<any>) {
  const { entry, tp, sl, quantity } = effect.payload;
  const smartTrade = await ctx.control.createSmartTrade(effect.ref, {
    type: "Trade",
    entry: { quantity, ...entry },
    tp: tp ? { quantity, ...tp } : undefined,
    sl: sl ? { quantity, ...sl } : undefined,
  });

  return new SmartTradeService(effect.ref, smartTrade);
}

async function runReplaceSmartTradeEffect(effect: ReturnType<typeof replaceSmartTrade>, ctx: TBotContext<any>) {
  const smartTrade = await ctx.control.replaceSmartTrade(effect.ref, effect.payload);

  return new SmartTradeService(effect.ref, smartTrade);
}

async function runUseTradeEffect(effect: ReturnType<typeof useTrade>, ctx: TBotContext<any>) {
  throw new Error("useTrade is deprecated");
}

async function runUseArbTradeEffect(effect: ReturnType<typeof useArbTrade>, ctx: TBotContext<any>) {
  const { payload, ref } = effect;

  const smartTrade = await ctx.control.getOrCreateSmartTrade(ref, {
    type: "ARB",
    entry: {
      exchangeAccountId: payload.exchange1,
      symbol: payload.symbol,
      side: XOrderSide.Buy,
      type: payload.price ? XOrderType.Limit : XOrderType.Market,
      price: payload.price,
      quantity: payload.quantity,
    },
    tp: {
      exchangeAccountId: payload.exchange2,
      symbol: payload.symbol,
      side: XOrderSide.Sell,
      type: payload.tp ? XOrderType.Limit : XOrderType.Market,
      price: payload.tp,
      quantity: payload.quantity,
    },
  });

  return new SmartTradeService(effect.ref, smartTrade);
}

async function runUseDcaEffect(effect: ReturnType<typeof useDca>, ctx: TBotContext<any>) {
  const { payload, ref } = effect;

  const smartTrade = await ctx.control.getOrCreateSmartTrade(ref, {
    type: "DCA",
    entry: {
      symbol: payload.symbol,
      type: payload.price ? XOrderType.Limit : XOrderType.Market,
      side: XOrderSide.Buy,
      price: payload.price,
      quantity: payload.quantity,
    },
    tp: {
      symbol: payload.symbol,
      type: XOrderType.Limit,
      side: XOrderSide.Sell,
      relativePrice: payload.tpPercent,
      quantity: payload.quantity,
    },
    sl: payload.slPercent
      ? {
          symbol: payload.symbol,
          type: XOrderType.Market,
          side: XOrderSide.Sell,
          relativePrice: -payload.slPercent,
          quantity: payload.quantity,
        }
      : undefined,
    safetyOrders: payload.safetyOrders.map((order) => ({
      relativePrice: order.relativePrice,
      quantity: order.quantity,
      symbol: payload.symbol,
      type: XOrderType.Limit,
      side: XOrderSide.Buy,
    })),
  });

  return new SmartTradeService(effect.ref, smartTrade);
}

async function runBuyEffect(effect: ReturnType<typeof buy>, ctx: TBotContext<any>) {
  const { payload, ref } = effect;

  let entry;

  if (payload.orderType === XOrderType.Market) {
    entry = {
      type: XOrderType.Market,
      side: XOrderSide.Buy,
      status: XOrderStatus.Idle,
      quantity: payload.quantity,
    };
  } else {
    // OrderType.Limit
    if (!payload.price) {
      throw new Error(`"price" is required for Limit buy orders`);
    }

    entry = {
      type: XOrderType.Limit,
      side: XOrderSide.Buy,
      status: XOrderStatus.Idle,
      price: payload.price,
      quantity: payload.quantity,
    };
  }

  let smartTrade = await ctx.control.getOrCreateSmartTrade(ref, {
    type: "Trade",
    entry,
  });

  if (smartTrade.tpOrder?.status === XOrderStatus.Filled) {
    console.info("Trade replaced. Reason: Sell filled");

    smartTrade = await ctx.control.createSmartTrade(ref, {
      type: "Trade",
      entry,
    });
  }

  return new SmartTradeService(ref, smartTrade);
}

async function runSellEffect(effect: ReturnType<typeof sell>, ctx: TBotContext<any>) {
  const { payload, ref } = effect;

  let smartTrade = await ctx.control.getSmartTrade(ref);
  if (!smartTrade) {
    console.info("Skip selling effect. Reason: Not bought before");

    return null;
  }

  if (smartTrade.entryOrder.status === XOrderStatus.Idle || smartTrade.entryOrder.status === XOrderStatus.Placed) {
    console.info("Skip selling effect. Reason: Buy order not filled yet");

    return null;
  }

  if (smartTrade.tpOrder) {
    console.info("Skip selling advice. Reason: Already selling");

    return null;
  }

  if (payload.orderType !== XOrderType.Market && !payload.price) {
    throw new Error(`"price" is required for Limit sell orders`);
  }

  smartTrade = await ctx.control.updateSmartTrade(ref, {
    tp: {
      type: payload.orderType || XOrderType.Limit,
      status: XOrderStatus.Idle,
      side: XOrderSide.Sell,
      price: payload.price,
      quantity: payload.quantity,
    },
  });

  if (!smartTrade) {
    console.warn("Skip selling advice. Smart trade not found.");

    return null;
  }

  return new SmartTradeService(effect.ref, smartTrade);
}

async function runGetOpenTradesEffect(effect: ReturnType<typeof getOpenTrades>, ctx: TBotContext<any>) {
  const trades = await ctx.control.getOpenTrades();

  return trades.map((trade) => new SmartTradeService(trade.ref, trade));
}

async function runCancelAllTradesEffect(
  effect: ReturnType<typeof cancelAllTrades>,
  ctx: TBotContext<any>,
): Promise<CancelAllTradesResult> {
  const trades = await ctx.control.getOpenTrades();

  let cancelledCount = 0;
  for (const trade of trades) {
    const cancelled = await ctx.control.cancelSmartTrade(trade.ref!);
    if (cancelled) cancelledCount++;
  }

  return {
    total: trades.length,
    cancelled: cancelledCount,
    failed: trades.length - cancelledCount,
  };
}

async function runUseExchangeEffect(effect: ReturnType<typeof useExchange>, ctx: TBotContext<any>) {
  const label = effect.payload;

  if (label) {
    return ctx.control.getExchange(label);
  }

  return ctx.exchange;
}

async function runUseMarketEffect(_effect: ReturnType<typeof useMarket>, ctx: TBotContext<any>) {
  return ctx.market;
}

async function runUseCandleEffect(effect: ReturnType<typeof useCandle>, ctx: TBotContext<any>) {
  const index = effect.payload;

  if (index >= 0) {
    return ctx.market.candles[index];
  }

  return ctx.market.candles[ctx.market.candles.length + index];
}

async function runUseIndicatorEffect(
  effect: ReturnType<typeof useIndicator>,
  ctx: TBotContext<any>,
): Promise<number[]> {
  const { name, barSize, options } = effect.payload;

  if (ctx.market.candles.length === 0) {
    console.warn(`[useIndicator] Candles are empty. Skipping ${name} calculation.`);

    return [];
  }

  switch (name) {
    case "RSI":
      return rsi(options, aggregateCandles(ctx.market.candles, barSize));
    case "SMA":
      return sma(options, aggregateCandles(ctx.market.candles, barSize));
    case "EMA":
      return ema(options, aggregateCandles(ctx.market.candles, barSize));
    default:
      console.warn(`[useIndicator] Unsupported indicator ${name}`);
      return [];
  }
}

async function runUseIndicatorsEffect(
  effect: ReturnType<typeof useIndicators>,
  ctx: TBotContext<any>,
): Promise<IndicatorsValues> {
  const indicators = effect.payload;

  const result: IndicatorsValues = {};

  for (const [name, timeframe, options] of indicators) {
    let values: number[] = [];

    switch (name) {
      case "RSI":
        values = await rsi(options, aggregateCandles(ctx.market.candles, timeframe));
        break;
      case "SMA":
        values = await sma(options, aggregateCandles(ctx.market.candles, timeframe));
        break;
      case "EMA":
        values = await ema(options, aggregateCandles(ctx.market.candles, timeframe));
        break;
      default:
        console.warn(`[useIndicators] Unsupported indicator ${name}`);
        break;
    }

    if (!result[name]) result[name] = {};
    if (!result[name][timeframe]) result[name][timeframe] = {};

    result[name][timeframe][JSON.stringify(options)] = values.at(-1)!;
  }

  return result;
}

async function runUseRsiIndicatorEffect(effect: ReturnType<typeof useRSI>, ctx: TBotContext<any>): Promise<number> {
  if (ctx.market.candles.length === 0) {
    console.warn("[UseRSI] Candles are empty. Skipping RSI calculation. Returned NaN.");

    return NaN;
  }

  const periods = effect.payload;
  const rsiValues = await rsi({ periods }, ctx.market.candles);

  return rsiValues[rsiValues.length - 1];
}
