import { BarSize } from "../common/index.js";

/**
 * Used in forms in custom fields with React Query Builder
 */
export type IndicatorValue = {
  /**
   * Numeric string.
   */
  indicatorValue: string;
  /**
   * Numeric string.
   */
  periods: string;
  timeframe: BarSize;
};

export const isIndicatorValue = (value: any): value is IndicatorValue => {
  return value?.indicatorValue !== undefined && value?.periods !== undefined && value?.timeframe !== undefined;
};
