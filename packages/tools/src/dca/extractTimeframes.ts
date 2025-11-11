import type { RuleGroupType } from "react-querybuilder";

import { BarSize, isIndicatorValue } from "@opentrader/types";
import { isGroup } from "./utils.js";

export function extractTimeframes(entryConditions: RuleGroupType) {
  const timeframes: BarSize[] = [];

  for (const rule of entryConditions.rules) {
    if (isGroup(rule)) {
      timeframes.push(...extractTimeframes(rule));
    } else {
      if (isIndicatorValue(rule.value)) {
        timeframes.push(rule.value.timeframe);
      }
    }
  }

  return [...new Set(timeframes)];
}
