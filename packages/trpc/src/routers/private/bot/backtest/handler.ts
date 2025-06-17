import type { Context } from "../../../../utils/context.js";
import type { TBacktestInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TBacktestInputSchema;
};

/**
 * @deprecated Need to reimplement CCXTCandlesProvider
 */
export async function backtest({ ctx, input }: Options) {
  // const { exchangeAccountId, symbol, settings, timeframe, template, startDate, endDate } = input;
  // const exchangeAccount = await xprisma.exchangeAccount.findUnique({ where: { id: exchangeAccountId } });
  // if (!exchangeAccount) {
  //   throw new TRPCError({
  //     message: "Exchange Account doesn't exists",
  //     code: "NOT_FOUND",
  //   });
  // }
  // let strategy: ReturnType<typeof findStrategy>;
  // try {
  //   strategy = findStrategy(template);
  // } catch (err) {
  //   throw new TRPCError({
  //     message: `Strategy ${template} not found`,
  //     code: "NOT_FOUND",
  //   });
  // }
  // const parsed = strategy.strategyFn.schema.safeParse(settings);
  // if (!parsed.success) {
  //   throw new TRPCError({
  //     message: `Invalid strategy params: ${parsed.error.message}`,
  //     code: "PARSE_ERROR",
  //   });
  // }
  // const ccxtExchange = exchangeCodeMapCCXT[exchangeAccount.exchangeCode as ExchangeCode];
  // const exchange = new ccxt[ccxtExchange as keyof typeof ccxt]();
  // const botConfig: IBotConfiguration<any> = {
  //   id: 0,
  //   symbol,
  //   exchangeCode: exchangeAccount.exchangeCode as ExchangeCode,
  //   settings,
  //   timeframe,
  // };
  // const backtesting = new Backtesting({ botConfig, botTemplate: strategy.strategyFn });
  // return new Promise((resolve) => {
  //   const candles: ICandlestick[] = [];
  //   const candleProvider = new CCXTCandlesProvider({
  //     exchange,
  //     symbol,
  //     timeframe,
  //     startDate,
  //     endDate,
  //   });
  //   candleProvider.on("candle", (candle) => candles.push(candle));
  //   candleProvider.on("done", async () => {
  //     console.log(`Fetched ${candles.length} candlesticks`);
  //     const report = await backtesting.run(candles);
  //     resolve({
  //       result: report,
  //     });
  //   });
  //   candleProvider.emit("start");
  // });
  return null;
}
