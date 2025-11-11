import type { RuleGroupType } from "react-querybuilder";

import { BarSize, isIndicatorValue, TIndicatorName, TIndicatorOptions } from "@opentrader/types";
import { isGroup } from "./utils.js";


export function extractIndicators(entryConditions: RuleGroupType) {
  const result: Array<[name: TIndicatorName, timeframe: BarSize, options: TIndicatorOptions<any>]> = [];

  for (const rule of entryConditions.rules) {
    if (isGroup(rule)) {
      result.push(...extractIndicators(rule));
    } else {
      if (isIndicatorValue(rule.value)) {
        result.push([rule.field as TIndicatorName, rule.value.timeframe, { periods: Number(rule.value.periods) }]); // @todo other indicators may have different `options` structure
      }
    }
  }

  return result.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });
}
