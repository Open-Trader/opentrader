import { BarSize, TIndicatorName, TIndicatorOptions } from "@opentrader/types";
import { barSizeToDuration } from "../candlesticks/index.js";

/**
 * Returns the max required number of candles based on indicators options.
 * @param indicatorsOptions
 */
export function requiredHistory(
  indicatorsOptions: Array<[name: TIndicatorName, timeframe: BarSize, options: TIndicatorOptions<any>]>,
) {
  return indicatorsOptions.reduce((acc, [, timeframe, options]) => {
    const { periods } = options;
    const barSizeInMinutes = barSizeToDuration(timeframe) / 60000;
    const requiredHistory = barSizeInMinutes * periods;

    if (requiredHistory > acc) {
      return requiredHistory;
    }

    return acc;
  }, 0);
}
