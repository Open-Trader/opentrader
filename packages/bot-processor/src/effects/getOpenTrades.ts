import { GET_OPEN_TRADES } from "./types/index.js";
import { makeEffect } from "./utils/index.js";

export function getOpenTrades() {
  return makeEffect(GET_OPEN_TRADES, undefined, undefined);
}
