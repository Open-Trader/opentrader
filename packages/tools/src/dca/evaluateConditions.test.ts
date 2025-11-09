import { describe, it, expect } from "vitest";
import type { RuleGroupType } from "react-querybuilder";

import { evaluateConditions, IndicatorsValues } from "./evaluateConditions.js";

const INDICATORS: IndicatorsValues = {
  RSI: {
    "1m": { '{"periods":14}': 40 },
    "5m": { '{"periods":14}': 30 },
  },
  SMA: {
    "15m": { '{"periods":7}': 50 },
  },
  EMA: {
    "1d": { '{"periods":7}': 50 },
  },
};

const entryConditions: RuleGroupType = {
  combinator: "and",
  rules: [
    {
      field: "RSI",
      operator: ">",
      value: {
        indicatorValue: "30",
        timeframe: "1m",
        periods: "14",
      },
      id: "rule-1",
    },
    {
      field: "SMA",
      operator: "=",
      value: {
        indicatorValue: "50",
        timeframe: "15m",
        periods: "7",
      },
      id: "rule-2",
    },
    {
      combinator: "or",
      rules: [
        {
          field: "RSI",
          operator: "=",
          value: {
            indicatorValue: "30",
            timeframe: "5m",
            periods: "14",
          },
          id: "sub-rule-1",
        },
        {
          field: "EMA",
          operator: "=",
          value: {
            indicatorValue: "50",
            timeframe: "1d",
            periods: "7",
          },
          id: "sub-rule-2",
        },
      ],
      id: "nested-rule-group",
    },
  ],
  id: "main-rule-group",
};

describe("shouldEntry function", () => {
  it("returns true when all conditions match", () => {
    const result = evaluateConditions(entryConditions, INDICATORS);
    expect(result).toBe(true);
  });

  it("returns false when a condition does not match", () => {
    const modifiedIndicators = {
      ...INDICATORS,
      RSI: {
        ...INDICATORS.RSI,
        "1m": {
          '{"periods":14}': 20,
        }, // Fails the "RSI > 30" condition
      },
    };

    const result = evaluateConditions(entryConditions, modifiedIndicators);
    expect(result).toBe(false);
  });

  it("returns true for nested group with 'or' combinator if any condition matches", () => {
    const modifiedConditions = {
      ...entryConditions,
      rules: [
        ...entryConditions.rules,
        {
          combinator: "or",
          rules: [
            {
              field: "RSI",
              operator: ">",
              value: {
                indicatorValue: "50", // fails this rule
                timeframe: "1m",
                periods: "14",
              },
              id: "rule-1",
            },
            {
              field: "SMA",
              operator: "=",
              value: {
                indicatorValue: "50", // passes this rule
                timeframe: "15m",
                periods: "7",
              },
              id: "rule-2",
            },
          ],
        },
      ],
    };

    const result = evaluateConditions(modifiedConditions, INDICATORS);
    expect(result).toBe(true);
  });

  it("handles missing indicator values gracefully", () => {
    const missingIndicators = {
      RSI: {
        "1m": {
          '{"periods":14}': 40,
        },
      },
    };

    const result = evaluateConditions(entryConditions, missingIndicators);
    expect(result).toBe(false);
  });

  it("throws an error for unsupported combinator", () => {
    const invalidConditions = {
      ...entryConditions,
      combinator: "xor", // Invalid combinator
    } as RuleGroupType;

    expect(() => evaluateConditions(invalidConditions, INDICATORS)).toThrowError("Unsupported combinator");
  });

  it("throws an error for unsupported operator", () => {
    const invalidConditions = {
      ...entryConditions,
      rules: [
        {
          field: "RSI",
          operator: "in", // Invalid operator
          value: {
            indicatorValue: "30",
            timeframe: "1m",
            periods: "14",
          },
          id: "rule-1",
        },
      ],
    };

    expect(() => evaluateConditions(invalidConditions, INDICATORS)).toThrowError("Unsupported operator");
  });
});
