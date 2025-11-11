import type { XOrderSide, XOrderStatus, XOrderType } from "@opentrader/types";
import type { Trade } from "../types/index.js";
import {
  GET_SMART_TRADE,
  CANCEL_SMART_TRADE,
  CREATE_SMART_TRADE,
  REPLACE_SMART_TRADE,
  USE_SMART_TRADE,
} from "./types/index.js";
import { makeEffect } from "./utils/index.js";

// Default smart trade reference
const DEFAULT_REF = "0";

export type UseSmartTradePayload = {
  entry: {
    type: XOrderType;
    side: XOrderSide;
    price?: number; // if undefined, then it's a market order
    status?: XOrderStatus; // default to Idle
  };
  tp?: {
    type: XOrderType;
    side: XOrderSide;
    price?: number; // if undefined, then it's a market order
    status?: XOrderStatus; // default to Idle
  };
  sl?: {
    type: XOrderType;
    side: XOrderSide;
    price?: number; // if undefined, then it's a market order
    stopPrice: number;
  };
  quantity: number;
};

export function useSmartTrade(params: UseSmartTradePayload, ref = DEFAULT_REF) {
  return makeEffect(USE_SMART_TRADE, params, ref);
}

export function getSmartTrade(ref = DEFAULT_REF) {
  return makeEffect(GET_SMART_TRADE, undefined, ref);
}

export function createSmartTrade(payload: UseSmartTradePayload, ref = DEFAULT_REF) {
  return makeEffect(CREATE_SMART_TRADE, payload, ref);
}

export function cancelSmartTrade(ref = DEFAULT_REF) {
  return makeEffect(CANCEL_SMART_TRADE, undefined, ref);
}

export function replaceSmartTrade(payload: Trade, ref = DEFAULT_REF) {
  return makeEffect(REPLACE_SMART_TRADE, payload, ref);
}
