import type { IExchange } from "@opentrader/exchanges";
import { Trade, CreateTrade } from "../trade/index.js";

export interface IBotControl {
  /**
   * Stop bot
   */
  stop: () => Promise<void>;
  getSmartTrade: (ref: string) => Promise<Trade | null>;
  updateSmartTrade: (ref: string, payload: Pick<CreateTrade, "tp">) => Promise<Trade | null>;
  createSmartTrade: (ref: string, payload: CreateTrade) => Promise<Trade>;
  getOrCreateSmartTrade: (ref: string, payload: CreateTrade) => Promise<Trade>;
  replaceSmartTrade: (ref: string, payload: Trade) => Promise<Trade>;
  cancelSmartTrade: (ref: string) => Promise<boolean>;
  getOpenTrades: () => Promise<Trade[]>;
  getExchange: (label: string) => Promise<IExchange | null>;
}
