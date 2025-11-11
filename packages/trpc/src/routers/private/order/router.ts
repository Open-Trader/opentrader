import { router } from "../../../trpc.js";
import { authorizedProcedure } from "../../../procedures.js";
import { getOpenOrders } from "./get-open-orders/handler.js";
import { ZGetOpenOrdersInputSchema } from "./get-open-orders/schema.js";
import { getClosedOrders } from "./get-closed-orders/handler.js";
import { ZGetClosedOrdersInputSchema } from "./get-closed-orders/schema.js";
import { getInfiniteOrders } from "./get-infinite-orders/handler.js";
import { ZGetInfiniteOrdersInputSchema } from "./get-infinite-orders/schema.js";

export const orderRouter = router({
  openOrders: authorizedProcedure.input(ZGetOpenOrdersInputSchema).query(getOpenOrders),
  closedOrders: authorizedProcedure.input(ZGetClosedOrdersInputSchema).query(getClosedOrders),
  infiniteOrders: authorizedProcedure.input(ZGetInfiniteOrdersInputSchema).query(getInfiniteOrders),
});
