import { describe, expect, it } from "vitest";
import type { RuleType } from "react-querybuilder";

import { BarSize, IndicatorValue } from "@opentrader/types";
import { extractTimeframes } from "./extractTimeframes.js";

const RSI_RULE: RuleType<"RSI", string, IndicatorValue> = {
  field: "RSI",
  operator: "=",
  value: {
    indicatorValue: "30",
    timeframe: "1d",
    periods: "14",
  },
};

const SMA_RULE: RuleType<"SMA", string, IndicatorValue> = {
  field: "SMA",
  operator: "=",
  value: {
    indicatorValue: "50",
    timeframe: "1h",
    periods: "7",
  },
};

const EMA_RULE: RuleType<"EMA", string, IndicatorValue> = {
  field: "EMA",
  operator: "=",
  value: {
    indicatorValue: "70",
    timeframe: "4h",
    periods: "10",
  },
};

const NON_INDICATOR_RULE: RuleType = {
  field: "SOME_SIGNAL",
  operator: "=",
  value: true,
};

describe("extractTimeframes", () => {
  it("should return an empty array when no rules provided", () => {
    expect(
      extractTimeframes({
        combinator: "and",
        rules: [],
      }),
    ).toEqual([]);
  });

  it("should return timeframes when rules provided", () => {
    expect(
      extractTimeframes({
        combinator: "and",
        rules: [RSI_RULE, SMA_RULE],
      }),
    ).toEqual([BarSize.ONE_DAY, BarSize.ONE_HOUR]);
  });

  it("should ignore non-indicator rules", () => {
    expect(
      extractTimeframes({
        combinator: "and",
        rules: [RSI_RULE, SMA_RULE, NON_INDICATOR_RULE],
      }),
    ).toEqual([BarSize.ONE_DAY, BarSize.ONE_HOUR]);
  });

  it("should extract timeframes from nested rules", () => {
    expect(
      extractTimeframes({
        combinator: "and",
        rules: [
          RSI_RULE,
          SMA_RULE,
          {
            combinator: "and",
            rules: [EMA_RULE],
          },
        ],
      }),
    ).toEqual([BarSize.ONE_DAY, BarSize.ONE_HOUR, BarSize.FOUR_HOURS]);
  });
});
