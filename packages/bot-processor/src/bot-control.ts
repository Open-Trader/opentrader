import { IBotConfiguration, IBotControl, IStore, CreateTrade, Trade, Order } from "./types/index.js";

export class BotControl<T extends IBotConfiguration> implements IBotControl {
  constructor(
    private store: IStore,
    private bot: T,
  ) {}

  async stop() {
    return this.store.stopBot(this.bot.id);
  }

  async getSmartTrade(ref: string) {
    return this.store.getSmartTrade(ref, this.bot.id);
  }

  async createSmartTrade(ref: string, payload: CreateTrade) {
    return this.store.createSmartTrade(ref, payload, this.bot.id);
  }

  async updateSmartTrade(ref: string, payload: Pick<CreateTrade, "tp">) {
    return this.store.updateSmartTrade(ref, payload, this.bot.id);
  }

  async getOrCreateSmartTrade(ref: string, payload: CreateTrade) {
    const smartTrade = await this.store.getSmartTrade(ref, this.bot.id);

    if (smartTrade) {
      return smartTrade;
    }

    return this.store.createSmartTrade(ref, payload, this.bot.id);
  }

  async replaceSmartTrade(ref: string, smartTrade: Trade) {
    const copyOrder = (order: Order) => ({
      type: order.type,
      side: order.side,
      quantity: order.quantity,
      price: order.price,
      relativePrice: order.relativePrice,
      stopPrice: order.stopPrice,
    });

    const entry = copyOrder(smartTrade.entryOrder);

    switch (smartTrade.type) {
      case "Trade":
        return this.store.createSmartTrade(
          ref,
          { type: "Trade", entry, tp: smartTrade.tpOrder ? copyOrder(smartTrade.tpOrder) : undefined },
          this.bot.id,
        );
      case "DCA":
        return this.store.createSmartTrade(
          ref,
          {
            type: "DCA",
            entry,
            tp: copyOrder(smartTrade.tpOrder),
            safetyOrders: smartTrade.safetyOrders.map(copyOrder),
          },
          this.bot.id,
        );
      case "ARB":
        return this.store.createSmartTrade(
          ref,
          {
            type: "ARB",
            entry,
            tp: copyOrder(smartTrade.tpOrder),
          },
          this.bot.id,
        );
    }
  }

  async getOpenTrades() {
    return this.store.getOpenTrades(this.bot.id);
  }

  async cancelSmartTrade(ref: string) {
    return this.store.cancelSmartTrade(ref, this.bot.id);
  }

  async getExchange(label: string) {
    return this.store.getExchange(label);
  }
}
