import type { Dictionary, Market } from "ccxt";
import type { IExchange } from "../exchange.interface.js";

export interface ICacheProvider {
  getMarkets: (exchange: IExchange) => Promise<Dictionary<Market>>;
}
