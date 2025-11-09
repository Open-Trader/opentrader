import type { RuleGroupType } from "react-querybuilder";

import { BarSize, TIndicatorName, isIndicatorValue } from "@opentrader/types";
import { isGroup, toIndicatorOptions } from "./utils.js";

export type IndicatorsValues = Partial<Record<TIndicatorName, Partial<Record<BarSize, { [options: string]: number }>>>>;

/**
 * Decide if Entry Order should be placed based on Entry Conditions.
 */
export function evaluateConditions(entryConditions: RuleGroupType, indicators: IndicatorsValues) {
  const expressions: boolean[] = [];

  for (const rule of entryConditions.rules) {
    if (isGroup(rule)) {
      expressions.push(evaluateConditions(rule, indicators));
    } else {
      if (isIndicatorValue(rule.value)) {
        const indicatorValue =
          indicators[rule.field as TIndicatorName]?.[rule.value.timeframe]?.[
            JSON.stringify(toIndicatorOptions(rule.field as TIndicatorName, rule.value))
          ];

        if (indicatorValue === undefined) {
          console.warn(
            `No indicator value provided for ${rule.field} ${rule.value.timeframe}. Skipping the rule.`,
            indicators,
          );
          continue;
        }

        // console.log(
        //   `Evaluate ${rule.field} ${rule.value.timeframe}: ${indicatorValue} ${rule.operator} ${rule.value.indicatorValue} -> ${evaluate(rule.operator, indicatorValue, Number(rule.value.indicatorValue))}`,
        // );
        expressions.push(evaluate(rule.operator, indicatorValue, Number(rule.value.indicatorValue)));
      } else {
        // for non-indicator conditions
        console.warn(`Non indicator rule provided. Default to: false`, rule);
        expressions.push(false);
      }
    }
  }

  return combine(entryConditions.combinator, expressions);
}

function evaluate(operator: "=" | "!=" | "<" | ">" | "<=" | ">=" | string, value1: number, value2: number): boolean {
  switch (operator) {
    case "=":
      return value1 === value2;
    case "!=":
      return value1 !== value2;
    case "<":
      return value1 < value2;
    case ">":
      return value1 > value2;
    case "<=":
      return value1 <= value2;
    case ">=":
      return value1 >= value2;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

function combine(combinator: "and" | "or" | string, expressions: boolean[]): boolean {
  if (combinator === "and") {
    return expressions.every(Boolean);
  } else if (combinator === "or") {
    return expressions.some(Boolean);
  } else {
    throw new Error(`Unsupported combinator: ${combinator}`);
  }
}
