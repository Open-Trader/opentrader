import { trpc } from "../trpc.js";
import {
  botRouter,
  exchangeAccountsRouter,
  dcaBotRouter,
  gridBotRouter,
  smartTradeRouter,
  symbolsRouter,
  candlesRouter,
  orderRouter,
  exchangeRouter,
} from "./private/router.js";
import { publicRouter } from "./public/router.js";

export const appRouter = trpc.router({
  exchangeAccount: exchangeAccountsRouter,
  symbol: symbolsRouter,
  candles: candlesRouter,
  bot: botRouter,
  dcaBot: dcaBotRouter,
  gridBot: gridBotRouter,
  smartTrade: smartTradeRouter,
  order: orderRouter,
  exchange: exchangeRouter,
  public: publicRouter,
});

export type AppRouter = typeof appRouter;
