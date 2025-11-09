import type { IExchange } from "@opentrader/exchanges";
import { Trade, CreateTrade } from "../trade/index.js";

export interface IStore {
  stopBot: (botId: number) => Promise<void>;
  getSmartTrade: (ref: string, botId: number) => Promise<Trade | null>;
  createSmartTrade: (ref: string, payload: CreateTrade, botId: number) => Promise<Trade>;

  // @todo rename to addTp
  updateSmartTrade: (ref: string, payload: Pick<CreateTrade, "tp">, botId: number) => Promise<Trade | null>;

  /**
   * If `true` then SmartTrade was canceled with success.
   * @param ref - SmartTrade ref
   * @param botId - Bot ID
   */
  cancelSmartTrade: (ref: string, botId: number) => Promise<boolean>;

  getOpenTrades: (botId: number) => Promise<Trade[]>;

  getExchange: (label: string) => Promise<IExchange | null>;
}
