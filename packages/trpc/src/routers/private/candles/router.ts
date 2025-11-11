import { router } from "../../../trpc.js";
import { authorizedProcedure } from "../../../procedures.js";
import { getCandles } from "./get-candles/handler.js";
import { ZGetCandlesInputSchema } from "./get-candles/schema.js";

export const candlesRouter = router({
  list: authorizedProcedure.input(ZGetCandlesInputSchema).query(getCandles),
});
