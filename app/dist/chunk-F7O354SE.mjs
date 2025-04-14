import { createRequire } from 'module';

const require = createRequire(import.meta.url);

        if (typeof globalThis.__dirname === "undefined") {
          globalThis.__dirname = new URL('.', import.meta.url).pathname;
        }
        if (typeof globalThis.__filename === "undefined") {
          globalThis.__filename = new URL(import.meta.url).pathname;
        }
      
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../packages/bot-processor/src/effects/types/effect-types.ts
var USE_SMART_TRADE = "USE_SMART_TRADE";
var USE_TRADE = "USE_TRADE";
var USE_ARB_TRADE = "USE_ARB_TRADE";
var USE_DCA = "USE_DCA";
var BUY = "BUY";
var SELL = "SELL";
var REPLACE_SMART_TRADE = "REPLACE_SMART_TRADE";
var GET_SMART_TRADE = "GET_SMART_TRADE";
var CREATE_SMART_TRADE = "CREATE_SMART_TRADE";
var CANCEL_SMART_TRADE = "CANCEL_SMART_TRADE";
var USE_EXCHANGE = "USE_EXCHANGE";
var USE_INDICATOR = "USE_INDICATOR";
var USE_INDICATORS = "USE_INDICATORS";
var USE_MARKET = "USE_MARKET";
var USE_CANDLE = "USE_CANDLE";
var USE_RSI_INDICATOR = "USE_RSI_INDICATOR";

// ../../packages/bot-processor/src/effects/utils/index.ts
var makeEffect = (type, payload, ref) => {
  return {
    ref,
    type,
    payload
  };
};
function isEffect(effect) {
  return !!effect?.type;
}

// ../../packages/bot-processor/src/effects/smart-trade.ts
var DEFAULT_REF = "0";
function useSmartTrade(params, ref = DEFAULT_REF) {
  return makeEffect(USE_SMART_TRADE, params, ref);
}
function getSmartTrade(ref = DEFAULT_REF) {
  return makeEffect(GET_SMART_TRADE, void 0, ref);
}
function createSmartTrade(payload, ref = DEFAULT_REF) {
  return makeEffect(CREATE_SMART_TRADE, payload, ref);
}
function cancelSmartTrade(ref = DEFAULT_REF) {
  return makeEffect(CANCEL_SMART_TRADE, void 0, ref);
}
function replaceSmartTrade(payload, ref = DEFAULT_REF) {
  return makeEffect(REPLACE_SMART_TRADE, payload, ref);
}

// ../../packages/bot-processor/src/effects/buy.ts
function buy(payload, ref = "0") {
  return makeEffect(BUY, payload, ref);
}

// ../../packages/bot-processor/src/effects/sell.ts
function sell(payload, ref = "0") {
  return makeEffect(SELL, payload, ref);
}

// ../../packages/bot-processor/src/effects/useExchange.ts
function useExchange(label) {
  return makeEffect(USE_EXCHANGE, label, void 0);
}

// ../../packages/bot-processor/src/effects/useIndicators.ts
function useIndicator(...[name, barSize, options]) {
  return makeEffect(USE_INDICATOR, { name, barSize, options }, void 0);
}
function useIndicators(payload) {
  return makeEffect(USE_INDICATORS, payload, void 0);
}

// ../../packages/bot-processor/src/effects/useTrade.ts
function useTrade(params, ref = "0") {
  return makeEffect(USE_TRADE, params, ref);
}

// ../../packages/bot-processor/src/effects/useArbTrade.ts
function useArbTrade(params, ref = "0") {
  return makeEffect(USE_ARB_TRADE, params, ref);
}

// ../../packages/bot-processor/src/effects/useDca.ts
function useDca(params, ref = "0") {
  return makeEffect(USE_DCA, params, ref);
}

// ../../packages/bot-processor/src/effects/market.ts
function useMarket() {
  return makeEffect(USE_MARKET, void 0, void 0);
}
function useCandle(index = -1) {
  return makeEffect(USE_CANDLE, index, void 0);
}

// ../../packages/bot-processor/src/effects/indicators.ts
function useRSI(periods = 14) {
  return makeEffect(USE_RSI_INDICATOR, periods, void 0);
}

// ../../packages/bot-processor/src/types/bot/bot-template.type.ts
var Watcher = {
  watchTrades: "watchTrades",
  watchOrderbook: "watchOrderbook",
  watchTicker: "watchTicker",
  watchCandles: "watchCandles"
};

// ../../packages/types/src/common/db.enums.ts
var XOrderSide = {
  Buy: "Buy",
  Sell: "Sell"
};
var XOrderStatus = {
  Idle: "Idle",
  Placed: "Placed",
  Filled: "Filled",
  Canceled: "Canceled",
  Revoked: "Revoked",
  Deleted: "Deleted"
};
var XOrderType = {
  Limit: "Limit",
  Market: "Market"
};
var XSmartTradeType = {
  Trade: "Trade",
  DCA: "DCA",
  ARB: "ARB"
};
var XEntryType = {
  Order: "Order",
  Ladder: "Ladder"
};
var XTakeProfitType = {
  Order: "Order",
  Ladder: "Ladder",
  None: "None"
};
var XEntityType = {
  EntryOrder: "EntryOrder",
  TakeProfitOrder: "TakeProfitOrder",
  StopLossOrder: "StopLossOrder",
  SafetyOrder: "SafetyOrder"
};

// ../../packages/types/src/common/enums.ts
var BarSize = {
  ONE_MINUTE: "1m",
  FIVE_MINUTES: "5m",
  FIFTEEN_MINUTES: "15m",
  ONE_HOUR: "1h",
  FOUR_HOURS: "4h",
  ONE_DAY: "1d",
  ONE_WEEK: "1w",
  ONE_MONTH: "1M",
  THREE_MONTHS: "3M"
};
var ExchangeCode = {
  OKX: "OKX",
  BYBIT: "BYBIT",
  BINANCE: "BINANCE",
  KRAKEN: "KRAKEN",
  COINBASE: "COINBASE",
  GATEIO: "GATEIO",
  BITGET: "BITGET"
};

// ../../packages/types/src/smart-trade/enums.ts
var OrderType = {
  Limit: "Limit",
  Market: "Market"
};

// ../../packages/types/src/indicators/indicator-value.ts
var isIndicatorValue = (value) => {
  return value?.indicatorValue !== void 0 && value?.periods !== void 0 && value?.timeframe !== void 0;
};

// ../../packages/types/src/strategy-runner/context.ts
var StrategyAction = {
  start: "start",
  stop: "stop",
  process: "process"
};
var MarketEventType = {
  onOrderFilled: "onOrderFilled",
  onTradeCompleted: "onTradeCompleted",
  onCandleClosed: "onCandleClosed",
  onPublicTrade: "onPublicTrade",
  onOrderbookChange: "onOrderbookChange",
  onTickerChange: "onTickerChange"
};

// ../../packages/bot-processor/src/types/smart-trade/smart-trade.service.ts
var SmartTradeService = class {
  constructor(ref, smartTrade) {
    this.ref = ref;
    this.smartTrade = smartTrade;
    this.type = smartTrade.type;
    this.entry = smartTrade.entryOrder;
    this.tp = smartTrade.tpOrder;
    this.sl = smartTrade.slOrder;
  }
  type;
  entry;
  tp;
  sl;
  /**
   * Create a new SmartTrade with same buy/sell orders
   */
  replace() {
    return replaceSmartTrade(this.smartTrade, this.ref);
  }
  cancel() {
    return cancelSmartTrade(this.ref);
  }
  isCompleted() {
    const closedWithTakeProfit = this.smartTrade.entryOrder.status === XOrderStatus.Filled && this.smartTrade.tpOrder?.status === XOrderStatus.Filled;
    const closedWithStopLoss = this.smartTrade.entryOrder.status === XOrderStatus.Filled && this.smartTrade.slOrder?.status === XOrderStatus.Filled;
    return closedWithTakeProfit || closedWithStopLoss;
  }
};

// ../../packages/bot-processor/src/bot-control.ts
var BotControl = class {
  constructor(store, bot) {
    this.store = store;
    this.bot = bot;
  }
  async stop() {
    return this.store.stopBot(this.bot.id);
  }
  async getSmartTrade(ref) {
    return this.store.getSmartTrade(ref, this.bot.id);
  }
  async createSmartTrade(ref, payload) {
    return this.store.createSmartTrade(ref, payload, this.bot.id);
  }
  async updateSmartTrade(ref, payload) {
    return this.store.updateSmartTrade(ref, payload, this.bot.id);
  }
  async getOrCreateSmartTrade(ref, payload) {
    const smartTrade = await this.store.getSmartTrade(ref, this.bot.id);
    if (smartTrade) {
      return smartTrade;
    }
    return this.store.createSmartTrade(ref, payload, this.bot.id);
  }
  async replaceSmartTrade(ref, smartTrade) {
    const copyOrder = (order) => ({
      type: order.type,
      side: order.side,
      quantity: order.quantity,
      price: order.price,
      relativePrice: order.relativePrice,
      stopPrice: order.stopPrice
    });
    const entry = copyOrder(smartTrade.entryOrder);
    switch (smartTrade.type) {
      case "Trade":
        return this.store.createSmartTrade(
          ref,
          { type: "Trade", entry, tp: smartTrade.tpOrder ? copyOrder(smartTrade.tpOrder) : void 0 },
          this.bot.id
        );
      case "DCA":
        return this.store.createSmartTrade(
          ref,
          {
            type: "DCA",
            entry,
            tp: copyOrder(smartTrade.tpOrder),
            safetyOrders: smartTrade.safetyOrders.map(copyOrder)
          },
          this.bot.id
        );
      case "ARB":
        return this.store.createSmartTrade(
          ref,
          {
            type: "ARB",
            entry,
            tp: copyOrder(smartTrade.tpOrder)
          },
          this.bot.id
        );
    }
  }
  async cancelSmartTrade(ref) {
    return this.store.cancelSmartTrade(ref, this.bot.id);
  }
  async getExchange(label) {
    return this.store.getExchange(label);
  }
};

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/Utils/LinkedList.js
var Item = class {
  constructor(data, prev, next) {
    this.next = next;
    if (next)
      next.prev = this;
    this.prev = prev;
    if (prev)
      prev.next = this;
    this.data = data;
  }
};
var LinkedList = class {
  constructor() {
    this._length = 0;
  }
  get head() {
    return this._head && this._head.data;
  }
  get tail() {
    return this._tail && this._tail.data;
  }
  get current() {
    return this._current && this._current.data;
  }
  get length() {
    return this._length;
  }
  push(data) {
    this._tail = new Item(data, this._tail);
    if (this._length === 0) {
      this._head = this._tail;
      this._current = this._head;
      this._next = this._head;
    }
    this._length++;
  }
  pop() {
    var tail = this._tail;
    if (this._length === 0) {
      return;
    }
    this._length--;
    if (this._length === 0) {
      this._head = this._tail = this._current = this._next = void 0;
      return tail.data;
    }
    this._tail = tail.prev;
    this._tail.next = void 0;
    if (this._current === tail) {
      this._current = this._tail;
      this._next = void 0;
    }
    return tail.data;
  }
  shift() {
    var head = this._head;
    if (this._length === 0) {
      return;
    }
    this._length--;
    if (this._length === 0) {
      this._head = this._tail = this._current = this._next = void 0;
      return head.data;
    }
    this._head = this._head.next;
    if (this._current === head) {
      this._current = this._head;
      this._next = this._current.next;
    }
    return head.data;
  }
  unshift(data) {
    this._head = new Item(data, void 0, this._head);
    if (this._length === 0) {
      this._tail = this._head;
      this._next = this._head;
    }
    this._length++;
  }
  unshiftCurrent() {
    var current = this._current;
    if (current === this._head || this._length < 2) {
      return current && current.data;
    }
    if (current === this._tail) {
      this._tail = current.prev;
      this._tail.next = void 0;
      this._current = this._tail;
    } else {
      current.next.prev = current.prev;
      current.prev.next = current.next;
      this._current = current.prev;
    }
    this._next = this._current.next;
    current.next = this._head;
    current.prev = void 0;
    this._head.prev = current;
    this._head = current;
    return current.data;
  }
  removeCurrent() {
    var current = this._current;
    if (this._length === 0) {
      return;
    }
    this._length--;
    if (this._length === 0) {
      this._head = this._tail = this._current = this._next = void 0;
      return current.data;
    }
    if (current === this._tail) {
      this._tail = current.prev;
      this._tail.next = void 0;
      this._current = this._tail;
    } else if (current === this._head) {
      this._head = current.next;
      this._head.prev = void 0;
      this._current = this._head;
    } else {
      current.next.prev = current.prev;
      current.prev.next = current.next;
      this._current = current.prev;
    }
    this._next = this._current.next;
    return current.data;
  }
  resetCursor() {
    this._current = this._next = this._head;
    return this;
  }
  next() {
    var next = this._next;
    if (next !== void 0) {
      this._next = next.next;
      this._current = next;
      return next.data;
    }
  }
};

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/config.js
var config = {};
function getConfig(key) {
  return config[key];
}

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/Utils/NumberFormatter.js
function format(v) {
  let precision = getConfig("precision");
  if (precision) {
    return parseFloat(v.toPrecision(precision));
  }
  return v;
}

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/indicator/indicator.js
var Indicator = class {
  constructor(input) {
    this.format = input.format || format;
  }
  static reverseInputs(input) {
    if (input.reversedInput) {
      input.values ? input.values.reverse() : void 0;
      input.open ? input.open.reverse() : void 0;
      input.high ? input.high.reverse() : void 0;
      input.low ? input.low.reverse() : void 0;
      input.close ? input.close.reverse() : void 0;
      input.volume ? input.volume.reverse() : void 0;
      input.timestamp ? input.timestamp.reverse() : void 0;
    }
  }
  getResult() {
    return this.result;
  }
};

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/moving_averages/SMA.js
var SMA = class extends Indicator {
  constructor(input) {
    super(input);
    this.period = input.period;
    this.price = input.values;
    var genFn = function* (period) {
      var list = new LinkedList();
      var sum = 0;
      var counter = 1;
      var current = yield;
      var result;
      list.push(0);
      while (true) {
        if (counter < period) {
          counter++;
          list.push(current);
          sum = sum + current;
        } else {
          sum = sum - list.shift() + current;
          result = sum / period;
          list.push(current);
        }
        current = yield result;
      }
    };
    this.generator = genFn(this.period);
    this.generator.next();
    this.result = [];
    this.price.forEach((tick) => {
      var result = this.generator.next(tick);
      if (result.value !== void 0) {
        this.result.push(this.format(result.value));
      }
    });
  }
  nextValue(price) {
    var result = this.generator.next(price).value;
    if (result != void 0)
      return this.format(result);
  }
};
SMA.calculate = sma;
function sma(input) {
  Indicator.reverseInputs(input);
  var result = new SMA(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/moving_averages/EMA.js
var EMA = class extends Indicator {
  constructor(input) {
    super(input);
    var period = input.period;
    var priceArray = input.values;
    var exponent = 2 / (period + 1);
    var sma3;
    this.result = [];
    sma3 = new SMA({ period, values: [] });
    var genFn = function* () {
      var tick = yield;
      var prevEma;
      while (true) {
        if (prevEma !== void 0 && tick !== void 0) {
          prevEma = (tick - prevEma) * exponent + prevEma;
          tick = yield prevEma;
        } else {
          tick = yield;
          prevEma = sma3.nextValue(tick);
          if (prevEma)
            tick = yield prevEma;
        }
      }
    };
    this.generator = genFn();
    this.generator.next();
    this.generator.next();
    priceArray.forEach((tick) => {
      var result = this.generator.next(tick);
      if (result.value != void 0) {
        this.result.push(this.format(result.value));
      }
    });
  }
  nextValue(price) {
    var result = this.generator.next(price).value;
    if (result != void 0)
      return this.format(result);
  }
};
EMA.calculate = ema;
function ema(input) {
  Indicator.reverseInputs(input);
  var result = new EMA(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/Utils/AverageGain.js
var AverageGain = class extends Indicator {
  constructor(input) {
    super(input);
    let values = input.values;
    let period = input.period;
    let format2 = this.format;
    this.generator = function* (period2) {
      var currentValue = yield;
      var counter = 1;
      var gainSum = 0;
      var avgGain;
      var gain;
      var lastValue = currentValue;
      currentValue = yield;
      while (true) {
        gain = currentValue - lastValue;
        gain = gain > 0 ? gain : 0;
        if (gain > 0) {
          gainSum = gainSum + gain;
        }
        if (counter < period2) {
          counter++;
        } else if (avgGain === void 0) {
          avgGain = gainSum / period2;
        } else {
          avgGain = (avgGain * (period2 - 1) + gain) / period2;
        }
        lastValue = currentValue;
        avgGain = avgGain !== void 0 ? format2(avgGain) : void 0;
        currentValue = yield avgGain;
      }
    }(period);
    this.generator.next();
    this.result = [];
    values.forEach((tick) => {
      var result = this.generator.next(tick);
      if (result.value !== void 0) {
        this.result.push(result.value);
      }
    });
  }
  nextValue(price) {
    return this.generator.next(price).value;
  }
};
AverageGain.calculate = averagegain;
function averagegain(input) {
  Indicator.reverseInputs(input);
  var result = new AverageGain(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/Utils/AverageLoss.js
var AverageLoss = class extends Indicator {
  constructor(input) {
    super(input);
    let values = input.values;
    let period = input.period;
    let format2 = this.format;
    this.generator = function* (period2) {
      var currentValue = yield;
      var counter = 1;
      var lossSum = 0;
      var avgLoss;
      var loss;
      var lastValue = currentValue;
      currentValue = yield;
      while (true) {
        loss = lastValue - currentValue;
        loss = loss > 0 ? loss : 0;
        if (loss > 0) {
          lossSum = lossSum + loss;
        }
        if (counter < period2) {
          counter++;
        } else if (avgLoss === void 0) {
          avgLoss = lossSum / period2;
        } else {
          avgLoss = (avgLoss * (period2 - 1) + loss) / period2;
        }
        lastValue = currentValue;
        avgLoss = avgLoss !== void 0 ? format2(avgLoss) : void 0;
        currentValue = yield avgLoss;
      }
    }(period);
    this.generator.next();
    this.result = [];
    values.forEach((tick) => {
      var result = this.generator.next(tick);
      if (result.value !== void 0) {
        this.result.push(result.value);
      }
    });
  }
  nextValue(price) {
    return this.generator.next(price).value;
  }
};
AverageLoss.calculate = averageloss;
function averageloss(input) {
  Indicator.reverseInputs(input);
  var result = new AverageLoss(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}

// ../../node_modules/.pnpm/technicalindicators@3.1.0/node_modules/technicalindicators/lib/oscillators/RSI.js
var RSI = class extends Indicator {
  constructor(input) {
    super(input);
    var period = input.period;
    var values = input.values;
    var GainProvider = new AverageGain({ period, values: [] });
    var LossProvider = new AverageLoss({ period, values: [] });
    this.generator = function* (period2) {
      var current = yield;
      var lastAvgGain, lastAvgLoss, RS, currentRSI;
      while (true) {
        lastAvgGain = GainProvider.nextValue(current);
        lastAvgLoss = LossProvider.nextValue(current);
        if (lastAvgGain !== void 0 && lastAvgLoss !== void 0) {
          if (lastAvgLoss === 0) {
            currentRSI = 100;
          } else if (lastAvgGain === 0) {
            currentRSI = 0;
          } else {
            RS = lastAvgGain / lastAvgLoss;
            RS = isNaN(RS) ? 0 : RS;
            currentRSI = parseFloat((100 - 100 / (1 + RS)).toFixed(2));
          }
        }
        current = yield currentRSI;
      }
    }();
    this.generator.next();
    this.result = [];
    values.forEach((tick) => {
      var result = this.generator.next(tick);
      if (result.value !== void 0) {
        this.result.push(result.value);
      }
    });
  }
  nextValue(price) {
    return this.generator.next(price).value;
  }
};
RSI.calculate = rsi;
function rsi(input) {
  Indicator.reverseInputs(input);
  var result = new RSI(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}

// ../../packages/indicators/src/utils/indicator.error.ts
var IndicatorError = class extends Error {
  indicator;
  /**
   * @param message - Error message
   * @param indicator - Indicator name, e.g. "RSI"
   */
  constructor(message, indicator) {
    super(message);
    this.name = "IndicatorError";
    this.indicator = indicator;
  }
};

// ../../packages/indicators/src/indicators/rsi.ts
async function rsi2(params, candles) {
  const prices = candles.map((candle) => candle.close);
  if (params.periods < 2) {
    throw new IndicatorError("RSI requires at least 2 periods", "RSI");
  }
  if (candles.length < 1) {
    throw new IndicatorError("No candles provided for RSI", "RSI");
  }
  const rsiValues = RSI.calculate({
    period: params.periods,
    values: prices
  });
  const emptyRsiValues = new Array(
    candles.length - rsiValues.length
  ).fill(NaN);
  return [...emptyRsiValues, ...rsiValues];
}

// ../../packages/indicators/src/indicators/ema.ts
async function ema2(params, candles) {
  const prices = candles.map((candle) => candle.close);
  if (params.periods < 2) {
    throw new IndicatorError("EMA requires at least 2 periods", "EMA");
  }
  if (candles.length < 1) {
    throw new IndicatorError("No candles provided for EMA", "EMA");
  }
  const indicatorValues = EMA.calculate({
    period: params.periods,
    values: prices
  });
  const emptyIndicatorValue = new Array(
    candles.length - indicatorValues.length
  ).fill(NaN);
  return [...emptyIndicatorValue, ...indicatorValues];
}

// ../../packages/indicators/src/indicators/sma.ts
async function sma2(params, candles) {
  const prices = candles.map((candle) => candle.close);
  if (params.periods < 2) {
    throw new IndicatorError("SMA requires at least 2 periods", "SMA");
  }
  if (candles.length < 1) {
    throw new IndicatorError("No candles provided for SMA", "SMA");
  }
  const indicatorValues = SMA.calculate({
    period: params.periods,
    values: prices
  });
  const emptyIndicatorValue = new Array(
    candles.length - indicatorValues.length
  ).fill(NaN);
  return [...emptyIndicatorValue, ...indicatorValues];
}

// ../../node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs
var DP = 20;
var RM = 1;
var MAX_DP = 1e6;
var MAX_POWER = 1e6;
var NE = -7;
var PE = 21;
var STRICT = false;
var NAME = "[big.js] ";
var INVALID = NAME + "Invalid ";
var INVALID_DP = INVALID + "decimal places";
var INVALID_RM = INVALID + "rounding mode";
var DIV_BY_ZERO = NAME + "Division by zero";
var P = {};
var UNDEFINED = void 0;
var NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function _Big_() {
  function Big2(n) {
    var x = this;
    if (!(x instanceof Big2)) return n === UNDEFINED ? _Big_() : new Big2(n);
    if (n instanceof Big2) {
      x.s = n.s;
      x.e = n.e;
      x.c = n.c.slice();
    } else {
      if (typeof n !== "string") {
        if (Big2.strict === true && typeof n !== "bigint") {
          throw TypeError(INVALID + "value");
        }
        n = n === 0 && 1 / n < 0 ? "-0" : String(n);
      }
      parse(x, n);
    }
    x.constructor = Big2;
  }
  Big2.prototype = P;
  Big2.DP = DP;
  Big2.RM = RM;
  Big2.NE = NE;
  Big2.PE = PE;
  Big2.strict = STRICT;
  Big2.roundDown = 0;
  Big2.roundHalfUp = 1;
  Big2.roundHalfEven = 2;
  Big2.roundUp = 3;
  return Big2;
}
function parse(x, n) {
  var e, i, nl;
  if (!NUMERIC.test(n)) {
    throw Error(INVALID + "number");
  }
  x.s = n.charAt(0) == "-" ? (n = n.slice(1), -1) : 1;
  if ((e = n.indexOf(".")) > -1) n = n.replace(".", "");
  if ((i = n.search(/e/i)) > 0) {
    if (e < 0) e = i;
    e += +n.slice(i + 1);
    n = n.substring(0, i);
  } else if (e < 0) {
    e = n.length;
  }
  nl = n.length;
  for (i = 0; i < nl && n.charAt(i) == "0"; ) ++i;
  if (i == nl) {
    x.c = [x.e = 0];
  } else {
    for (; nl > 0 && n.charAt(--nl) == "0"; ) ;
    x.e = e - i - 1;
    x.c = [];
    for (e = 0; i <= nl; ) x.c[e++] = +n.charAt(i++);
  }
  return x;
}
function round(x, sd, rm, more) {
  var xc = x.c;
  if (rm === UNDEFINED) rm = x.constructor.RM;
  if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
    throw Error(INVALID_RM);
  }
  if (sd < 1) {
    more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
    xc.length = 1;
    if (more) {
      x.e = x.e - sd + 1;
      xc[0] = 1;
    } else {
      xc[0] = x.e = 0;
    }
  } else if (sd < xc.length) {
    more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);
    xc.length = sd;
    if (more) {
      for (; ++xc[--sd] > 9; ) {
        xc[sd] = 0;
        if (sd === 0) {
          ++x.e;
          xc.unshift(1);
          break;
        }
      }
    }
    for (sd = xc.length; !xc[--sd]; ) xc.pop();
  }
  return x;
}
function stringify(x, doExponential, isNonzero) {
  var e = x.e, s = x.c.join(""), n = s.length;
  if (doExponential) {
    s = s.charAt(0) + (n > 1 ? "." + s.slice(1) : "") + (e < 0 ? "e" : "e+") + e;
  } else if (e < 0) {
    for (; ++e; ) s = "0" + s;
    s = "0." + s;
  } else if (e > 0) {
    if (++e > n) {
      for (e -= n; e--; ) s += "0";
    } else if (e < n) {
      s = s.slice(0, e) + "." + s.slice(e);
    }
  } else if (n > 1) {
    s = s.charAt(0) + "." + s.slice(1);
  }
  return x.s < 0 && isNonzero ? "-" + s : s;
}
P.abs = function() {
  var x = new this.constructor(this);
  x.s = 1;
  return x;
};
P.cmp = function(y) {
  var isneg, x = this, xc = x.c, yc = (y = new x.constructor(y)).c, i = x.s, j = y.s, k = x.e, l = y.e;
  if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
  if (i != j) return i;
  isneg = i < 0;
  if (k != l) return k > l ^ isneg ? 1 : -1;
  j = (k = xc.length) < (l = yc.length) ? k : l;
  for (i = -1; ++i < j; ) {
    if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
  }
  return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};
P.div = function(y) {
  var x = this, Big2 = x.constructor, a = x.c, b = (y = new Big2(y)).c, k = x.s == y.s ? 1 : -1, dp = Big2.DP;
  if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  if (!b[0]) {
    throw Error(DIV_BY_ZERO);
  }
  if (!a[0]) {
    y.s = k;
    y.c = [y.e = 0];
    return y;
  }
  var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, p = dp + (q.e = x.e - y.e) + 1;
  q.s = k;
  k = p < 0 ? 0 : p;
  bz.unshift(0);
  for (; rl++ < bl; ) r.push(0);
  do {
    for (n = 0; n < 10; n++) {
      if (bl != (rl = r.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri = -1, cmp = 0; ++ri < bl; ) {
          if (b[ri] != r[ri]) {
            cmp = b[ri] > r[ri] ? 1 : -1;
            break;
          }
        }
      }
      if (cmp < 0) {
        for (bt = rl == bl ? b : bz; rl; ) {
          if (r[--rl] < bt[rl]) {
            ri = rl;
            for (; ri && !r[--ri]; ) r[ri] = 9;
            --r[ri];
            r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }
        for (; !r[0]; ) r.shift();
      } else {
        break;
      }
    }
    qc[qi++] = cmp ? n : ++n;
    if (r[0] && cmp) r[rl] = a[ai] || 0;
    else r = [a[ai]];
  } while ((ai++ < al || r[0] !== UNDEFINED) && k--);
  if (!qc[0] && qi != 1) {
    qc.shift();
    q.e--;
    p--;
  }
  if (qi > p) round(q, p, Big2.RM, r[0] !== UNDEFINED);
  return q;
};
P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.gte = function(y) {
  return this.cmp(y) > -1;
};
P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.minus = P.sub = function(y) {
  var i, j, t, xlty, x = this, Big2 = x.constructor, a = x.s, b = (y = new Big2(y)).s;
  if (a != b) {
    y.s = -b;
    return x.plus(y);
  }
  var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
  if (!xc[0] || !yc[0]) {
    if (yc[0]) {
      y.s = -b;
    } else if (xc[0]) {
      y = new Big2(x);
    } else {
      y.s = 1;
    }
    return y;
  }
  if (a = xe - ye) {
    if (xlty = a < 0) {
      a = -a;
      t = xc;
    } else {
      ye = xe;
      t = yc;
    }
    t.reverse();
    for (b = a; b--; ) t.push(0);
    t.reverse();
  } else {
    j = ((xlty = xc.length < yc.length) ? xc : yc).length;
    for (a = b = 0; b < j; b++) {
      if (xc[b] != yc[b]) {
        xlty = xc[b] < yc[b];
        break;
      }
    }
  }
  if (xlty) {
    t = xc;
    xc = yc;
    yc = t;
    y.s = -y.s;
  }
  if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--; ) xc[i++] = 0;
  for (b = i; j > a; ) {
    if (xc[--j] < yc[j]) {
      for (i = j; i && !xc[--i]; ) xc[i] = 9;
      --xc[i];
      xc[j] += 10;
    }
    xc[j] -= yc[j];
  }
  for (; xc[--b] === 0; ) xc.pop();
  for (; xc[0] === 0; ) {
    xc.shift();
    --ye;
  }
  if (!xc[0]) {
    y.s = 1;
    xc = [ye = 0];
  }
  y.c = xc;
  y.e = ye;
  return y;
};
P.mod = function(y) {
  var ygtx, x = this, Big2 = x.constructor, a = x.s, b = (y = new Big2(y)).s;
  if (!y.c[0]) {
    throw Error(DIV_BY_ZERO);
  }
  x.s = y.s = 1;
  ygtx = y.cmp(x) == 1;
  x.s = a;
  y.s = b;
  if (ygtx) return new Big2(x);
  a = Big2.DP;
  b = Big2.RM;
  Big2.DP = Big2.RM = 0;
  x = x.div(y);
  Big2.DP = a;
  Big2.RM = b;
  return this.minus(x.times(y));
};
P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return x;
};
P.plus = P.add = function(y) {
  var e, k, t, x = this, Big2 = x.constructor;
  y = new Big2(y);
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
  if (!xc[0] || !yc[0]) {
    if (!yc[0]) {
      if (xc[0]) {
        y = new Big2(x);
      } else {
        y.s = x.s;
      }
    }
    return y;
  }
  xc = xc.slice();
  if (e = xe - ye) {
    if (e > 0) {
      ye = xe;
      t = yc;
    } else {
      e = -e;
      t = xc;
    }
    t.reverse();
    for (; e--; ) t.push(0);
    t.reverse();
  }
  if (xc.length - yc.length < 0) {
    t = yc;
    yc = xc;
    xc = t;
  }
  e = yc.length;
  for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
  if (k) {
    xc.unshift(k);
    ++ye;
  }
  for (e = xc.length; xc[--e] === 0; ) xc.pop();
  y.c = xc;
  y.e = ye;
  return y;
};
P.pow = function(n) {
  var x = this, one = new x.constructor("1"), y = one, isneg = n < 0;
  if (n !== ~~n || n < -1e6 || n > MAX_POWER) {
    throw Error(INVALID + "exponent");
  }
  if (isneg) n = -n;
  for (; ; ) {
    if (n & 1) y = y.times(x);
    n >>= 1;
    if (!n) break;
    x = x.times(x);
  }
  return isneg ? one.div(y) : y;
};
P.prec = function(sd, rm) {
  if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
    throw Error(INVALID + "precision");
  }
  return round(new this.constructor(this), sd, rm);
};
P.round = function(dp, rm) {
  if (dp === UNDEFINED) dp = 0;
  else if (dp !== ~~dp || dp < -1e6 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  return round(new this.constructor(this), dp + this.e + 1, rm);
};
P.sqrt = function() {
  var r, c, t, x = this, Big2 = x.constructor, s = x.s, e = x.e, half = new Big2("0.5");
  if (!x.c[0]) return new Big2(x);
  if (s < 0) {
    throw Error(NAME + "No square root");
  }
  s = Math.sqrt(+stringify(x, true, true));
  if (s === 0 || s === 1 / 0) {
    c = x.c.join("");
    if (!(c.length + e & 1)) c += "0";
    s = Math.sqrt(c);
    e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    r = new Big2((s == 1 / 0 ? "5e" : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + e);
  } else {
    r = new Big2(s + "");
  }
  e = r.e + (Big2.DP += 4);
  do {
    t = r;
    r = half.times(t.plus(x.div(t)));
  } while (t.c.slice(0, e).join("") !== r.c.slice(0, e).join(""));
  return round(r, (Big2.DP -= 4) + r.e + 1, Big2.RM);
};
P.times = P.mul = function(y) {
  var c, x = this, Big2 = x.constructor, xc = x.c, yc = (y = new Big2(y)).c, a = xc.length, b = yc.length, i = x.e, j = y.e;
  y.s = x.s == y.s ? 1 : -1;
  if (!xc[0] || !yc[0]) {
    y.c = [y.e = 0];
    return y;
  }
  y.e = i + j;
  if (a < b) {
    c = xc;
    xc = yc;
    yc = c;
    j = a;
    a = b;
    b = j;
  }
  for (c = new Array(j = a + b); j--; ) c[j] = 0;
  for (i = b; i--; ) {
    b = 0;
    for (j = a + i; j > i; ) {
      b = c[j] + yc[i] * xc[j - i - 1] + b;
      c[j--] = b % 10;
      b = b / 10 | 0;
    }
    c[j] = b;
  }
  if (b) ++y.e;
  else c.shift();
  for (i = c.length; !c[--i]; ) c.pop();
  y.c = c;
  return y;
};
P.toExponential = function(dp, rm) {
  var x = this, n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), ++dp, rm);
    for (; x.c.length < dp; ) x.c.push(0);
  }
  return stringify(x, true, !!n);
};
P.toFixed = function(dp, rm) {
  var x = this, n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), dp + x.e + 1, rm);
    for (dp = dp + x.e + 1; x.c.length < dp; ) x.c.push(0);
  }
  return stringify(x, false, !!n);
};
P[Symbol.for("nodejs.util.inspect.custom")] = P.toJSON = P.toString = function() {
  var x = this, Big2 = x.constructor;
  return stringify(x, x.e <= Big2.NE || x.e >= Big2.PE, !!x.c[0]);
};
P.toNumber = function() {
  var n = +stringify(this, true, true);
  if (this.constructor.strict === true && !this.eq(n.toString())) {
    throw Error(NAME + "Imprecise conversion");
  }
  return n;
};
P.toPrecision = function(sd, rm) {
  var x = this, Big2 = x.constructor, n = x.c[0];
  if (sd !== UNDEFINED) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + "precision");
    }
    x = round(new Big2(x), sd, rm);
    for (; x.c.length < sd; ) x.c.push(0);
  }
  return stringify(x, sd <= x.e || x.e <= Big2.NE || x.e >= Big2.PE, !!n);
};
P.valueOf = function() {
  var x = this, Big2 = x.constructor;
  if (Big2.strict === true) {
    throw Error(NAME + "valueOf disallowed");
  }
  return stringify(x, x.e <= Big2.NE || x.e >= Big2.PE, true);
};
var Big = _Big_();
var big_default = Big;

// ../../packages/tools/src/grid/calcGridStepSize.ts
function calcGridStepSize(highPrice, lowPrice, gridLevels) {
  return big_default(highPrice).minus(lowPrice).div(gridLevels - 1).toNumber();
}

// ../../packages/tools/src/grid/calcGridLines.ts
function calcGridLines(highPrice, lowPrice, gridLevels, quantity) {
  const gridStepSize = calcGridStepSize(
    highPrice,
    lowPrice,
    gridLevels
  );
  return Array.from({ length: gridLevels }).map((_, i) => ({
    price: big_default(lowPrice).plus(big_default(gridStepSize).mul(i)).toNumber(),
    quantity
  }));
}

// ../../packages/tools/src/currency/common/getExponentAbs.ts
function getExponentAbs(numberLike) {
  const number = new big_default(numberLike);
  return Math.abs(number.e);
}

// ../../packages/tools/src/grid/isWaitingGridLine.ts
function isWaitingGridLine(gridLine, gridLines, currentAssetPrice) {
  const gridLineIndex = gridLines.findIndex(
    (gridLineItem) => gridLineItem.price === gridLine.price && gridLineItem.quantity === gridLine.quantity
  );
  if (gridLineIndex === -1) {
    throw new Error(
      `Cannot find grid line index of { price: ${gridLine.price}, quantity: ${gridLine.quantity} }`
    );
  }
  const targetGridLine = gridLines[gridLineIndex];
  const prevGridLine = gridLines[gridLineIndex - 1];
  const nextGridLine = gridLines[gridLineIndex + 1];
  const targetGridLinePriceDiff = big_default(currentAssetPrice).minus(targetGridLine.price).abs();
  if (prevGridLine) {
    const prevGridLinePriceDiff = big_default(currentAssetPrice).minus(prevGridLine.price).abs();
    if (big_default(prevGridLinePriceDiff).lt(targetGridLinePriceDiff)) {
      return false;
    }
  }
  if (nextGridLine) {
    const nextGridLinePriceDiff = big_default(currentAssetPrice).minus(nextGridLine.price).abs();
    if (big_default(nextGridLinePriceDiff).lte(targetGridLinePriceDiff)) {
      return false;
    }
  }
  return true;
}

// ../../packages/tools/src/grid/nextGridLinePrice.ts
function nextGridLinePrice(gridLines, currentGridLineIndex) {
  const nextGridLine = gridLines[currentGridLineIndex + 1];
  if (!nextGridLine) {
    throw new Error(
      `nextGridLinePrice: Grid line at index ${currentGridLineIndex} doesn't exists`
    );
  }
  return nextGridLine.price;
}

// ../../packages/tools/src/grid/computeGridLevelsFromCurrentAssetPrice.ts
function computeGridLevelsFromCurrentAssetPrice(gridLines, currentAssetPrice) {
  return gridLines.flatMap((gridLine, i) => {
    if (i === gridLines.length - 1) {
      return [];
    }
    const sellOrderPrice = nextGridLinePrice(gridLines, i);
    if (isWaitingGridLine(gridLine, gridLines, currentAssetPrice) || gridLine.price > currentAssetPrice) {
      const gridLevel2 = {
        buy: {
          price: gridLine.price,
          quantity: gridLine.quantity,
          status: XOrderStatus.Filled
        },
        sell: {
          price: sellOrderPrice,
          quantity: gridLine.quantity,
          status: XOrderStatus.Idle
        }
      };
      return [gridLevel2];
    }
    const gridLevel = {
      buy: {
        price: gridLine.price,
        quantity: gridLine.quantity,
        status: XOrderStatus.Idle
      },
      sell: {
        price: sellOrderPrice,
        quantity: gridLine.quantity,
        status: XOrderStatus.Idle
      }
    };
    return [gridLevel];
  });
}

// ../../packages/tools/src/dca/utils.ts
var isGroup = (rule) => {
  return !!rule?.rules;
};
var toIndicatorOptions = (name, indicator) => {
  switch (name) {
    case "RSI":
    case "EMA":
    case "SMA":
      return { periods: Number(indicator.periods) };
    default:
      throw new Error(`toIndicatorOptions: Unsupported indicator ${name}`);
  }
};

// ../../packages/tools/src/dca/evaluateConditions.ts
function evaluateConditions(entryConditions, indicators) {
  const expressions = [];
  for (const rule of entryConditions.rules) {
    if (isGroup(rule)) {
      expressions.push(evaluateConditions(rule, indicators));
    } else {
      if (isIndicatorValue(rule.value)) {
        const indicatorValue = indicators[rule.field]?.[rule.value.timeframe]?.[JSON.stringify(toIndicatorOptions(rule.field, rule.value))];
        if (indicatorValue === void 0) {
          console.warn(
            `No indicator value provided for ${rule.field} ${rule.value.timeframe}. Skipping the rule.`,
            indicators
          );
          continue;
        }
        expressions.push(evaluate(rule.operator, indicatorValue, Number(rule.value.indicatorValue)));
      } else {
        console.warn(`Non indicator rule provided. Default to: false`, rule);
        expressions.push(false);
      }
    }
  }
  return combine(entryConditions.combinator, expressions);
}
function evaluate(operator, value1, value2) {
  switch (operator) {
    case "=":
      return value1 === value2;
    case "!=":
      return value1 !== value2;
    case "<":
      return value1 < value2;
    case ">":
      return value1 > value2;
    case "<=":
      return value1 <= value2;
    case ">=":
      return value1 >= value2;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}
function combine(combinator, expressions) {
  if (combinator === "and") {
    return expressions.every(Boolean);
  } else if (combinator === "or") {
    return expressions.some(Boolean);
  } else {
    throw new Error(`Unsupported combinator: ${combinator}`);
  }
}

// ../../packages/tools/src/dca/extractIndicators.ts
function extractIndicators(entryConditions) {
  const result = [];
  for (const rule of entryConditions.rules) {
    if (isGroup(rule)) {
      result.push(...extractIndicators(rule));
    } else {
      if (isIndicatorValue(rule.value)) {
        result.push([rule.field, rule.value.timeframe, { periods: Number(rule.value.periods) }]);
      }
    }
  }
  return result.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });
}

// ../../packages/tools/src/candlesticks/barSizeToDuration.ts
var ONE_MINUTE = 60 * 1e3;
var ONE_HOUR = 60 * ONE_MINUTE;
var ONE_DAY = 24 * ONE_HOUR;
var barSizeDurationMap = {
  "1m": ONE_MINUTE,
  "5m": 5 * ONE_MINUTE,
  "15m": 15 * ONE_MINUTE,
  "1h": ONE_HOUR,
  "4h": 4 * ONE_HOUR,
  "1d": ONE_DAY,
  "1w": 7 * ONE_DAY,
  "1M": 30 * ONE_DAY,
  // may require special approach because number of days in a month is not fixed
  "3M": 90 * ONE_DAY
  // may require special approach because number of days in a month is not fixed
};
function barSizeToDuration(barSize) {
  return barSizeDurationMap[barSize];
}

// ../../packages/tools/src/candlesticks/aggregateCandles.ts
function aggregateCandles(candles, timeframe) {
  if (timeframe === BarSize.ONE_MINUTE) {
    return candles;
  }
  const barSizeInMinutes = barSizeToDuration(timeframe) / 6e4;
  const oneMinuteCandles = [...candles];
  const resultCandles = [];
  while (oneMinuteCandles.length >= barSizeInMinutes) {
    resultCandles.push(aggregate(oneMinuteCandles.splice(0, barSizeInMinutes)));
  }
  return resultCandles;
}
function aggregate(candles) {
  return {
    open: candles[0].open,
    high: candles.reduce((acc, candle) => Math.max(acc, candle.high), 0),
    low: candles.reduce((acc, candle) => Math.min(acc, candle.low), Infinity),
    close: candles[candles.length - 1].close,
    volume: candles.reduce((acc, candle) => acc + candle.volume, 0),
    timestamp: candles[0].timestamp
  };
}

// ../../packages/tools/src/dca/requiredHistory.ts
function requiredHistory(indicatorsOptions) {
  return indicatorsOptions.reduce((acc, [, timeframe, options]) => {
    const { periods } = options;
    const barSizeInMinutes = barSizeToDuration(timeframe) / 6e4;
    const requiredHistory2 = barSizeInMinutes * periods;
    if (requiredHistory2 > acc) {
      return requiredHistory2;
    }
    return acc;
  }, 0);
}

// ../../packages/tools/src/symbolId/constants.ts
var EXCHANGE_CODE_DELIMITER = ":";
var CURRENCY_PAIR_DELIMITER = "/";

// ../../packages/tools/src/symbolId/composeSymbolIdFromPair.ts
function composeSymbolIdFromPair(exchangeCode, currencyPair) {
  return `${exchangeCode.toUpperCase()}${EXCHANGE_CODE_DELIMITER}${currencyPair}`;
}

// ../../packages/tools/src/symbolId/isValidSymbolId.ts
var exchangeCodes = Object.keys(ExchangeCode);
var spotSymbolPattern = `^(${exchangeCodes.join(
  "|"
)})${EXCHANGE_CODE_DELIMITER}[A-Z0-9]+${CURRENCY_PAIR_DELIMITER}[A-Z0-9]+$`;
var futuresSymbolPattern = `^(${exchangeCodes.join(
  "|"
)})${EXCHANGE_CODE_DELIMITER}[A-Z0-9]+${CURRENCY_PAIR_DELIMITER}[A-Z0-9]+${EXCHANGE_CODE_DELIMITER}[A-Z0-9]+$`;
function isValidSymbolId(symbolId) {
  return new RegExp(spotSymbolPattern).test(symbolId) || new RegExp(futuresSymbolPattern).test(symbolId);
}

// ../../packages/tools/src/symbolId/decomposeSymbolId.ts
function decomposeSymbolId(symbolId) {
  if (!isValidSymbolId(symbolId)) {
    throw new Error(`${symbolId} is not a valid symbolId`);
  }
  const [exchangeCodeKey, currencyPairSymbol, futuresCoin] = symbolId.split(EXCHANGE_CODE_DELIMITER);
  const [baseCurrency, quoteCurrency] = currencyPairSymbol.split(CURRENCY_PAIR_DELIMITER);
  return {
    exchangeCode: ExchangeCode[exchangeCodeKey],
    currencyPairSymbol: futuresCoin ? currencyPairSymbol + EXCHANGE_CODE_DELIMITER + futuresCoin : currencyPairSymbol,
    baseCurrency,
    quoteCurrency
  };
}

// ../../packages/tools/src/symbolId/isValidSymbol.ts
function isValidSymbol(symbol) {
  const symbolPattern = `^[A-Z0-9]+${CURRENCY_PAIR_DELIMITER}[A-Z0-9]+$`;
  return new RegExp(symbolPattern).test(symbol);
}

// ../../packages/tools/src/symbol/decomposeSymbol.ts
function decomposeSymbol(symbol) {
  const [baseCurrency = "NONE", quoteCurrency = "NONE"] = symbol.split("/");
  return {
    baseCurrency,
    quoteCurrency
  };
}

// ../../packages/bot-processor/src/effect-runner.ts
var effectRunnerMap = {
  [USE_SMART_TRADE]: runUseSmartTradeEffect,
  [GET_SMART_TRADE]: runGetSmartTradeEffect,
  [CANCEL_SMART_TRADE]: runCancelSmartTradeEffect,
  [CREATE_SMART_TRADE]: runCreateSmartTradeEffect,
  [REPLACE_SMART_TRADE]: runReplaceSmartTradeEffect,
  [USE_TRADE]: runUseTradeEffect,
  [USE_ARB_TRADE]: runUseArbTradeEffect,
  [USE_DCA]: runUseDcaEffect,
  [BUY]: runBuyEffect,
  [SELL]: runSellEffect,
  [USE_EXCHANGE]: runUseExchangeEffect,
  [USE_INDICATOR]: runUseIndicatorEffect,
  [USE_INDICATORS]: runUseIndicatorsEffect,
  [USE_MARKET]: runUseMarketEffect,
  [USE_CANDLE]: runUseCandleEffect,
  [USE_RSI_INDICATOR]: runUseRsiIndicatorEffect
};
async function runUseSmartTradeEffect(effect, ctx) {
  const { entry, tp, sl, quantity } = effect.payload;
  const smartTrade = await ctx.control.getOrCreateSmartTrade(effect.ref, {
    type: "Trade",
    entry: { quantity, ...entry },
    tp: tp ? { quantity, ...tp } : void 0,
    sl: sl ? { quantity, ...sl } : void 0
  });
  return new SmartTradeService(effect.ref, smartTrade);
}
async function runGetSmartTradeEffect(effect, ctx) {
  const smartTrade = await ctx.control.getSmartTrade(effect.ref);
  return smartTrade ? new SmartTradeService(effect.ref, smartTrade) : null;
}
async function runCancelSmartTradeEffect(effect, ctx) {
  return ctx.control.cancelSmartTrade(effect.ref);
}
async function runCreateSmartTradeEffect(effect, ctx) {
  const { entry, tp, sl, quantity } = effect.payload;
  const smartTrade = await ctx.control.createSmartTrade(effect.ref, {
    type: "Trade",
    entry: { quantity, ...entry },
    tp: tp ? { quantity, ...tp } : void 0,
    sl: sl ? { quantity, ...sl } : void 0
  });
  return new SmartTradeService(effect.ref, smartTrade);
}
async function runReplaceSmartTradeEffect(effect, ctx) {
  const smartTrade = await ctx.control.replaceSmartTrade(effect.ref, effect.payload);
  return new SmartTradeService(effect.ref, smartTrade);
}
async function runUseTradeEffect(effect, ctx) {
  throw new Error("useTrade is deprecated");
}
async function runUseArbTradeEffect(effect, ctx) {
  const { payload, ref } = effect;
  const smartTrade = await ctx.control.getOrCreateSmartTrade(ref, {
    type: "ARB",
    entry: {
      exchangeAccountId: payload.exchange1,
      symbol: payload.symbol,
      side: XOrderSide.Buy,
      type: payload.price ? XOrderType.Limit : XOrderType.Market,
      price: payload.price,
      quantity: payload.quantity
    },
    tp: {
      exchangeAccountId: payload.exchange2,
      symbol: payload.symbol,
      side: XOrderSide.Sell,
      type: payload.tp ? XOrderType.Limit : XOrderType.Market,
      price: payload.tp,
      quantity: payload.quantity
    }
  });
  return new SmartTradeService(effect.ref, smartTrade);
}
async function runUseDcaEffect(effect, ctx) {
  const { payload, ref } = effect;
  const smartTrade = await ctx.control.getOrCreateSmartTrade(ref, {
    type: "DCA",
    entry: {
      symbol: payload.symbol,
      type: payload.price ? XOrderType.Limit : XOrderType.Market,
      side: XOrderSide.Buy,
      price: payload.price,
      quantity: payload.quantity
    },
    tp: {
      symbol: payload.symbol,
      type: XOrderType.Limit,
      side: XOrderSide.Sell,
      relativePrice: payload.tpPercent,
      quantity: payload.quantity
    },
    sl: payload.slPercent ? {
      symbol: payload.symbol,
      type: XOrderType.Market,
      side: XOrderSide.Sell,
      relativePrice: -payload.slPercent,
      quantity: payload.quantity
    } : void 0,
    safetyOrders: payload.safetyOrders.map((order) => ({
      relativePrice: order.relativePrice,
      quantity: order.quantity,
      symbol: payload.symbol,
      type: XOrderType.Limit,
      side: XOrderSide.Buy
    }))
  });
  return new SmartTradeService(effect.ref, smartTrade);
}
async function runBuyEffect(effect, ctx) {
  const { payload, ref } = effect;
  let entry;
  if (payload.orderType === XOrderType.Market) {
    entry = {
      type: XOrderType.Market,
      side: XOrderSide.Buy,
      status: XOrderStatus.Idle,
      quantity: payload.quantity
    };
  } else {
    if (!payload.price) {
      throw new Error(`"price" is required for Limit buy orders`);
    }
    entry = {
      type: XOrderType.Limit,
      side: XOrderSide.Sell,
      status: XOrderStatus.Idle,
      price: payload.price,
      quantity: payload.quantity
    };
  }
  let smartTrade = await ctx.control.getOrCreateSmartTrade(ref, {
    type: "Trade",
    entry
  });
  if (smartTrade.tpOrder?.status === XOrderStatus.Filled) {
    console.info("Trade replaced. Reason: Sell filled");
    smartTrade = await ctx.control.createSmartTrade(ref, {
      type: "Trade",
      entry
    });
  }
  return new SmartTradeService(ref, smartTrade);
}
async function runSellEffect(effect, ctx) {
  const { payload, ref } = effect;
  let smartTrade = await ctx.control.getSmartTrade(ref);
  if (!smartTrade) {
    console.info("Skip selling effect. Reason: Not bought before");
    return null;
  }
  if (smartTrade.entryOrder.status === XOrderStatus.Idle || smartTrade.entryOrder.status === XOrderStatus.Placed) {
    console.info("Skip selling effect. Reason: Buy order not filled yet");
    return null;
  }
  if (smartTrade.tpOrder) {
    console.info("Skip selling advice. Reason: Already selling");
    return null;
  }
  if (payload.orderType !== XOrderType.Market && !payload.price) {
    throw new Error(`"price" is required for Limit sell orders`);
  }
  smartTrade = await ctx.control.updateSmartTrade(ref, {
    tp: {
      type: payload.orderType || XOrderType.Limit,
      status: XOrderStatus.Idle,
      side: XOrderSide.Buy,
      price: payload.price,
      quantity: payload.quantity
    }
  });
  if (!smartTrade) {
    console.warn("Skip selling advice. Smart trade not found.");
    return null;
  }
  return new SmartTradeService(effect.ref, smartTrade);
}
async function runUseExchangeEffect(effect, ctx) {
  const label = effect.payload;
  if (label) {
    return ctx.control.getExchange(label);
  }
  return ctx.exchange;
}
async function runUseMarketEffect(_effect, ctx) {
  return ctx.market;
}
async function runUseCandleEffect(effect, ctx) {
  const index = effect.payload;
  if (index >= 0) {
    return ctx.market.candles[index];
  }
  return ctx.market.candles[ctx.market.candles.length + index];
}
async function runUseIndicatorEffect(effect, ctx) {
  const { name, barSize, options } = effect.payload;
  if (ctx.market.candles.length === 0) {
    console.warn(`[useIndicator] Candles are empty. Skipping ${name} calculation.`);
    return [];
  }
  switch (name) {
    case "RSI":
      return rsi2(options, aggregateCandles(ctx.market.candles, barSize));
    case "SMA":
      return sma2(options, aggregateCandles(ctx.market.candles, barSize));
    case "EMA":
      return ema2(options, aggregateCandles(ctx.market.candles, barSize));
    default:
      console.warn(`[useIndicator] Unsupported indicator ${name}`);
      return [];
  }
}
async function runUseIndicatorsEffect(effect, ctx) {
  const indicators = effect.payload;
  const result = {};
  for (const [name, timeframe, options] of indicators) {
    let values = [];
    switch (name) {
      case "RSI":
        values = await rsi2(options, aggregateCandles(ctx.market.candles, timeframe));
        break;
      case "SMA":
        values = await sma2(options, aggregateCandles(ctx.market.candles, timeframe));
        break;
      case "EMA":
        values = await ema2(options, aggregateCandles(ctx.market.candles, timeframe));
        break;
      default:
        console.warn(`[useIndicators] Unsupported indicator ${name}`);
        break;
    }
    if (!result[name]) result[name] = {};
    if (!result[name][timeframe]) result[name][timeframe] = {};
    result[name][timeframe][JSON.stringify(options)] = values.at(-1);
  }
  return result;
}
async function runUseRsiIndicatorEffect(effect, ctx) {
  if (ctx.market.candles.length === 0) {
    console.warn("[UseRSI] Candles are empty. Skipping RSI calculation. Returned NaN.");
    return NaN;
  }
  const periods = effect.payload;
  const rsiValues = await rsi2({ periods }, ctx.market.candles);
  return rsiValues[rsiValues.length - 1];
}

// ../../packages/bot-processor/src/utils/createContext.ts
function createContext(control, config2, exchange, additionalExchanges, command, state, market = {
  candles: []
}, markets = {}, event) {
  return {
    control,
    config: config2,
    exchange,
    additionalExchanges,
    command,
    onStart: command === "start",
    onStop: command === "stop",
    onProcess: command === "process",
    state,
    market,
    markets,
    event
  };
}

// ../../packages/bot-processor/src/strategy-runner.ts
var StrategyRunner = class {
  constructor(control, botConfig, exchange, additionalExchanges, botTemplate) {
    this.control = control;
    this.botConfig = botConfig;
    this.exchange = exchange;
    this.additionalExchanges = additionalExchanges;
    this.botTemplate = botTemplate;
  }
  async start(state) {
    const context = createContext(
      this.control,
      this.botConfig,
      this.exchange,
      this.additionalExchanges,
      "start",
      state
    );
    await this.runTemplate(context);
  }
  async stop(state) {
    const context = createContext(this.control, this.botConfig, this.exchange, this.additionalExchanges, "stop", state);
    await this.runTemplate(context);
  }
  async process(state, event, market, markets = {}) {
    const context = createContext(
      this.control,
      this.botConfig,
      this.exchange,
      this.additionalExchanges,
      "process",
      state,
      market,
      markets,
      event
    );
    await this.runTemplate(context);
  }
  async runTemplate(context) {
    const generator = this.botTemplate(context);
    let item = generator.next();
    for (; !item.done; ) {
      if (item.value instanceof Promise) {
        const result = await item.value;
        item = generator.next(result);
      } else if (isEffect(item.value)) {
        const effect = item.value;
        const effectRunner = effectRunnerMap[effect.type];
        item = generator.next(await effectRunner(effect, context));
      } else {
        console.log(item.value);
        throw new Error("Unsupported effect");
      }
    }
  }
};
function createStrategyRunner(options) {
  const { botConfig, store, exchange, additionalExchanges, botTemplate } = options;
  const botControl = new BotControl(store, botConfig);
  return new StrategyRunner(botControl, botConfig, exchange, additionalExchanges, botTemplate);
}

export { BUY, BarSize, BotControl, CANCEL_SMART_TRADE, CREATE_SMART_TRADE, ExchangeCode, GET_SMART_TRADE, MarketEventType, OrderType, REPLACE_SMART_TRADE, SELL, SmartTradeService, StrategyAction, StrategyRunner, USE_ARB_TRADE, USE_CANDLE, USE_DCA, USE_EXCHANGE, USE_INDICATOR, USE_INDICATORS, USE_MARKET, USE_RSI_INDICATOR, USE_SMART_TRADE, USE_TRADE, Watcher, XEntityType, XEntryType, XOrderSide, XOrderStatus, XOrderType, XSmartTradeType, XTakeProfitType, __commonJS, __export, __reExport, __require, __toESM, barSizeToDuration, buy, calcGridLines, cancelSmartTrade, composeSymbolIdFromPair, computeGridLevelsFromCurrentAssetPrice, createSmartTrade, createStrategyRunner, decomposeSymbol, decomposeSymbolId, evaluateConditions, extractIndicators, getExponentAbs, getSmartTrade, isEffect, isValidSymbol, isValidSymbolId, makeEffect, replaceSmartTrade, requiredHistory, sell, useArbTrade, useCandle, useDca, useExchange, useIndicator, useIndicators, useMarket, useRSI, useSmartTrade, useTrade };
