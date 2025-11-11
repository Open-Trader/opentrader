export type TIndicatorName = "RSI" | "SMA" | "EMA";

export type TIndicatorOptions<I extends TIndicatorName> = I extends "RSI" | "SMA" | "EMA"
  ? {
      periods: number;
    }
  : never;
