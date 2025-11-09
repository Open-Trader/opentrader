import type { RuleGroupType } from "react-querybuilder";

import { IndicatorValue, TIndicatorName, TIndicatorOptions } from "@opentrader/types";

export const isGroup = (rule: any): rule is RuleGroupType => {
  return !!rule?.rules;
};

export const toIndicatorOptions = <I extends TIndicatorName>(
  name: I,
  indicator: IndicatorValue,
): TIndicatorOptions<I> => {
  switch (name) {
    case "RSI":
    case "EMA":
    case "SMA":
      return { periods: Number(indicator.periods) } satisfies TIndicatorOptions<"RSI"> as any;
    default:
      throw new Error(`toIndicatorOptions: Unsupported indicator ${name}`);
  }
};
