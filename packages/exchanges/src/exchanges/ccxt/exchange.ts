/**
 * Copyright 2024 bludnic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Repository URL: https://github.com/bludnic/opentrader
 */
import type {
  IAccountAsset,
  ICancelLimitOrderRequest,
  ICancelLimitOrderResponse,
  ICandlestick,
  IGetCandlesticksRequest,
  IGetClosedOrdersRequest,
  IGetClosedOrdersResponse,
  IGetLimitOrderRequest,
  IGetLimitOrderResponse,
  IGetMarketPriceRequest,
  IGetMarketPriceResponse,
  IGetOpenOrdersRequest,
  IGetOpenOrdersResponse,
  IGetSymbolInfoRequest,
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  IPlaceMarketOrderRequest,
  IPlaceMarketOrderResponse,
  IPlaceLimitOrderRequest,
  IPlaceLimitOrderResponse,
  IPlaceStopOrderRequest,
  IPlaceStopOrderResponse,
  ISymbolInfo,
  IWatchCandlesRequest,
  IWatchCandlesResponse,
  IWatchOrdersRequest,
  IWatchOrdersResponse,
  ExchangeCode,
  IWatchTradesRequest,
  IWatchTradesResponse,
  IOrderbook,
  ITicker,
  ITrade,
} from "@opentrader/types";
import { pro, exchanges } from "ccxt";
import type { Market, Exchange } from "ccxt";
import type { IExchange, IExchangeCredentials } from "../../types/index.js";
import { cache } from "../../cache.js";
import { fetcher } from "../../utils/next/fetcher.js";
import { normalize } from "./normalize.js";
import { exchangeCodeMapCCXT } from "../../client/constants.js";

export class CCXTExchange implements IExchange {
  public isPaper = false;
  public isDemo = false;
  public exchangeCode: ExchangeCode;
  public ccxt: Exchange;

  // Polling requests for exchanges that does not support sockets
  private tickerRequest: Record<string, Promise<ITicker> | null> = {};
  private orderbookRequest: Record<string, Promise<IOrderbook> | null> = {};
  private tradesRequest: Record<string, Promise<ITrade[]> | null> = {};

  constructor(exchangeCode: ExchangeCode, credentials?: IExchangeCredentials, isDemoAccount?: boolean) {
    this.exchangeCode = exchangeCode;
    this.isDemo = !!(credentials?.isDemoAccount || isDemoAccount);

    const ccxtCredentials = credentials
      ? {
          apiKey: credentials.apiKey,
          secret: credentials.secretKey,
          password: credentials.password,
        }
      : undefined;

    const ccxtClassName = exchangeCodeMapCCXT[exchangeCode];

    // If the exchange is listed in the `pro` object, it does support sockets.
    this.ccxt =
      ccxtClassName in pro
        ? new pro[ccxtClassName as keyof typeof pro](ccxtCredentials)
        : new exchanges[ccxtClassName as keyof typeof exchanges](ccxtCredentials);

    this.ccxt.fetchImplementation = fetcher; // #57
    // #88 Fixes: 'e instanceof this.AbortError' is not an object
    this.ccxt.FetchError = TypeError; // when fetch request failed (network error)
    this.ccxt.AbortError = DOMException; // when fetch request aborted
    this.ccxt.verbose = process.env.CCXT_VERBOSE === "true";

    if (this.isDemo) {
      this.ccxt.setSandboxMode(true);
    }
  }

  async destroy() {
    await this.ccxt.close();
  }

  async loadMarkets(): Promise<Record<string, Market>> {
    const cacheProvider = cache.getCacheProvider();
    return cacheProvider.getMarkets(this);
  }

  async accountAssets(): Promise<IAccountAsset[]> {
    const data = await this.ccxt.fetchBalance();

    return normalize.accountAssets.response(data);
  }

  async getLimitOrder(params: IGetLimitOrderRequest): Promise<IGetLimitOrderResponse> {
    const args = normalize.getLimitOrder.request(params);
    const data = await this.ccxt.fetchOrder(...args);

    return normalize.getLimitOrder.response(data);
  }

  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    const args = normalize.placeOrder.request(params);
    const data = await this.ccxt.createOrder(...args);

    return normalize.placeOrder.response(data);
  }

  async placeLimitOrder(params: IPlaceLimitOrderRequest): Promise<IPlaceLimitOrderResponse> {
    if ("clientOrderId" in params) {
      throw new Error("Fetch limit order by `clientOrderId` is not supported yet");
    }

    const args = normalize.placeLimitOrder.request(params);
    const data = await this.ccxt.createLimitOrder(...args);

    return normalize.placeLimitOrder.response(data);
  }

  async placeMarketOrder(params: IPlaceMarketOrderRequest): Promise<IPlaceMarketOrderResponse> {
    const args = normalize.placeMarketOrder.request(params);
    const data = await this.ccxt.createMarketOrder(...args);

    return normalize.placeMarketOrder.response(data);
  }

  async placeStopOrder(params: IPlaceStopOrderRequest): Promise<IPlaceStopOrderResponse> {
    if (params.type === "limit" && params.price === undefined) {
      throw new Error("Validation: `price` required for Limit order type");
    }

    const args = normalize.placeStopOrder.request(params);
    const data = await this.ccxt.createStopOrder(...args);

    return normalize.placeStopOrder.response(data);
  }

  async getOpenOrders(params: IGetOpenOrdersRequest): Promise<IGetOpenOrdersResponse> {
    const args = normalize.getOpenOrders.request(params);
    const data = await this.ccxt.fetchOpenOrders(...args);

    return normalize.getOpenOrders.response(data);
  }

  async getClosedOrders(params: IGetClosedOrdersRequest): Promise<IGetClosedOrdersResponse> {
    const args = normalize.getClosedOrders.request(params);
    const data = await this.ccxt.fetchClosedOrders(...args);

    return normalize.getClosedOrders.response(data);
  }

  async cancelLimitOrder(params: ICancelLimitOrderRequest): Promise<ICancelLimitOrderResponse> {
    const args = normalize.cancelLimitOrder.request(params);
    // The response is not typed properly.
    // Probably cause not all exchanges
    // return `orderId` in the response
    await this.ccxt.cancelOrder(...args);

    return {
      orderId: params.orderId,
    };
  }

  async getTicker(symbol: string): Promise<ITicker> {
    const args = normalize.getTicker.request(symbol);
    const data = await this.ccxt.fetchTicker(...args);

    return normalize.getTicker.response(data);
  }

  async getMarketPrice(params: IGetMarketPriceRequest): Promise<IGetMarketPriceResponse> {
    const args = normalize.getMarketPrice.request(params);
    const data = await this.ccxt.fetchTicker(...args);

    return normalize.getMarketPrice.response(data);
  }

  async getCandlesticks(params: IGetCandlesticksRequest): Promise<ICandlestick[]> {
    const args = normalize.getCandlesticks.request(params);
    const data = await this.ccxt.fetchOHLCV(...args);

    return normalize.getCandlesticks.response(data);
  }

  async getSymbol(params: IGetSymbolInfoRequest): Promise<ISymbolInfo> {
    const markets = await this.loadMarkets();

    const args = normalize.getSymbol.request(params);
    // method market() not typed by CCXT
    // const data: Market = await this.ccxt.market(...args);
    const data: Market = markets[args[0]];

    return normalize.getSymbol.response(data, this.exchangeCode); // @todo refactor
  }

  async getSymbols(type: "spot" | "future" | "option" | "swap" = "spot"): Promise<ISymbolInfo[]> {
    const markets = await this.loadMarkets();

    const spotMarkets = Object.entries(markets)
      .filter(([_currency, market]) => market?.type === type)
      .reduce<Record<string, Market>>((acc, [currency, market]) => {
        return {
          ...acc,
          [currency]: market,
        };
      }, {});

    return normalize.getSymbols.response(spotMarkets, this.exchangeCode);
  }

  async watchOrders(params: IWatchOrdersRequest = {}): Promise<IWatchOrdersResponse> {
    const args = normalize.watchOrders.request(params);
    const data = await this.ccxt.watchOrders(...args);

    return normalize.watchOrders.response(data);
  }

  async watchCandles(params: IWatchCandlesRequest): Promise<IWatchCandlesResponse> {
    const args = normalize.watchCandles.request(params);
    const data = await this.ccxt.watchOHLCV(...args);

    return normalize.watchCandles.response(data);
  }

  async watchTrades(params: IWatchTradesRequest): Promise<IWatchTradesResponse> {
    const args = normalize.watchTrades.request(params);
    if (this.ccxt.has.watchTrades) {
      const data = await this.ccxt.watchTrades(...args);
      return normalize.watchTrades.response(data);
    }

    if (!this.tradesRequest[params.symbol]) {
      this.tradesRequest[params.symbol] = delay(5000)
        .then(() => {
          return this.ccxt.fetchTrades(...args).then(normalize.watchTrades.response);
        })
        .finally(() => {
          this.tradesRequest[params.symbol] = null;
        });
    }
    return this.tradesRequest[params.symbol]!;
  }

  async getOrderbook(symbol: string): Promise<IOrderbook> {
    const args = normalize.watchOrderbook.request(symbol);
    const data = await this.ccxt.fetchOrderBook(...args);
    return normalize.watchOrderbook.response(data);
  }

  async watchOrderbook(symbol: string): Promise<IOrderbook> {
    const args = normalize.watchOrderbook.request(symbol);
    if (this.ccxt.has.watchOrderBook) {
      const data = await this.ccxt.watchOrderBook(...args);
      return normalize.watchOrderbook.response(data);
    }

    if (!this.orderbookRequest[symbol]) {
      this.orderbookRequest[symbol] = delay(1000)
        .then(() => {
          return this.ccxt.fetchOrderBook(...args).then(normalize.watchOrderbook.response);
        })
        .finally(() => {
          this.orderbookRequest[symbol] = null;
        });
    }
    return this.orderbookRequest[symbol];
  }

  async watchTicker(symbol: string): Promise<ITicker> {
    const args = normalize.watchTicker.request(symbol);
    if (this.ccxt.has.watchTicker) {
      const data = await this.ccxt.watchTicker(...args);
      return normalize.watchTicker.response(data);
    }

    if (!this.tickerRequest[symbol]) {
      this.tickerRequest[symbol] = delay(5000)
        .then(() => {
          return this.ccxt.fetchTicker(...args).then(normalize.watchTicker.response);
        })
        .finally(() => {
          this.tickerRequest[symbol] = null;
        });
    }
    return this.tickerRequest[symbol];
  }
}

function delay(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
