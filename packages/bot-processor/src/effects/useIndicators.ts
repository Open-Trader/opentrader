import { BarSize, TIndicatorName, TIndicatorOptions } from "@opentrader/types";
import { makeEffect } from "./utils/index.js";
import { USE_INDICATOR, USE_INDICATORS } from "./types/index.js";

type IndicatorPayload<I extends TIndicatorName = TIndicatorName> = [
  name: I,
  barSize: BarSize,
  options: TIndicatorOptions<I>,
];

export function useIndicator<I extends TIndicatorName>(...[name, barSize, options]: IndicatorPayload<I>) {
  return makeEffect(USE_INDICATOR, { name, barSize, options }, undefined);
}

export function useIndicators(payload: IndicatorPayload[]) {
  return makeEffect(USE_INDICATORS, payload, undefined);
}
