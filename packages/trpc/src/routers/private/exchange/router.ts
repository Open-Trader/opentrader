import { router } from "../../../trpc.js";
import { authorizedProcedure } from "../../../procedures.js";
import { getExchangeAssets } from "./get-assets/handler.js";
import { ZGetExchangeAssetsSchema } from "./get-assets/schema.js";
import { ZGetExchangeTickerSchema } from "./get-ticker/schema.js";
import { getTicker } from "./get-ticker/handler.js";

export const exchangeRouter = router({
  getAssets: authorizedProcedure.input(ZGetExchangeAssetsSchema).query(getExchangeAssets),
  getTicker: authorizedProcedure.input(ZGetExchangeTickerSchema).query(getTicker),
});
