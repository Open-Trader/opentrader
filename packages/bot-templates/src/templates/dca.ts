import { evaluateConditions, extractIndicators, IndicatorsValues, requiredHistory } from "@opentrader/tools";
import { z } from "zod";
import { logger } from "@opentrader/logger";
import { BarSize, ZDcaBotSettings } from "@opentrader/types";
import {
  useDca,
  cancelSmartTrade,
  IBotConfiguration,
  TBotContext,
  BotTemplate,
  useIndicators,
  type SmartTradeService,
} from "@opentrader/bot-processor";

export function* dca(ctx: TBotContext<DCABotConfig>) {
  const { config, onStart, onStop } = ctx;
  const { settings } = config;

  if (onStop) {
    yield cancelSmartTrade();
    logger.info(`[DCA] Bot with ${config.symbol} pair stopped`);

    return;
  }

  if (onStart) {
    logger.info(`[DCA] Bot strategy started on ${config.symbol} pair`);

    return;
  }

  const indicators: IndicatorsValues = yield useIndicators(extractIndicators(settings.entry.conditions));
  const shouldEntry = evaluateConditions(settings.entry.conditions, indicators);

  if (shouldEntry) {
    const options = {
      price: settings.entry.price,
      quantity: settings.entry.quantity,
      tpPercent: settings.tp.percent / 100,
      slPercent: settings.sl ? settings.sl.percent / 100 : undefined,
      safetyOrders: settings.safetyOrders.map((so) => ({
        relativePrice: -so.priceDeviation / 100,
        quantity: so.quantity,
      })),
    };

    const trade: SmartTradeService = yield useDca(options);
    if (trade.isCompleted()) {
      yield trade.replace();
      logger.info(`[DCA] Trade replaced`);
    }

    logger.info(options, `[DCA] Entry executed`);
  }

  logger.info(`[DCA] Strategy executed`);
}

dca.displayName = "DCA Bot";
dca.description =
  "Dollar-Cost Averaging (DCA) is a trading strategy that involves entering a position through multiple smaller orders, known as Safety Orders. These orders are placed at predetermined levels, below the initial entry price. This method helps reduce the impact of adverse price movements by lowering the overall cost of the position. Once the market reverses and the price reaches a favorable level, the position is closed at the Take Profit level. This strategy is especially effective in volatile markets, allowing traders to capitalize on price fluctuations while minimizing the risks of poor timing with a single large entry.";
dca.hidden = true;
dca.schema = ZDcaBotSettings;

dca.runPolicy = {
  onOrderFilled: true,
  onCandleClosed: true,
} satisfies Template["runPolicy"];

dca.requiredHistory = (({ settings }) => {
  const indicatorsOptions = extractIndicators(settings.entry.conditions);
  return requiredHistory(indicatorsOptions);
}) satisfies Template["requiredHistory"];

dca.timeframe = BarSize.ONE_MINUTE;

dca.watchers = {
  watchCandles: ({ symbol }: IBotConfiguration) => symbol,
};

type Template = BotTemplate<DCABotConfig>;

export type DCABotConfig = IBotConfiguration<z.infer<typeof dca.schema>>;
