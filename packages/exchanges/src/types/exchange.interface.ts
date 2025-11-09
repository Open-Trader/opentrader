import {
  IAccountAsset,
  IGetCandlesticksRequest,
  ICandlestick,
  IGetMarketPriceRequest,
  IGetMarketPriceResponse,
  ICancelLimitOrderRequest,
  ICancelLimitOrderResponse,
  IGetLimitOrderRequest,
  IGetLimitOrderResponse,
  ISymbolInfo,
  IGetSymbolInfoRequest,
  IGetOpenOrdersRequest,
  IGetOpenOrdersResponse,
  IGetClosedOrdersRequest,
  IGetClosedOrdersResponse,
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  IPlaceLimitOrderRequest,
  IPlaceLimitOrderResponse,
  IPlaceMarketOrderRequest,
  IPlaceMarketOrderResponse,
  IPlaceStopOrderRequest,
  IPlaceStopOrderResponse,
  IWatchOrdersRequest,
  IWatchOrdersResponse,
  ExchangeCode,
  IWatchCandlesRequest,
  IWatchTradesRequest,
  IWatchTradesResponse,
  IOrderbook,
  ITicker,
} from "@opentrader/types";
import type { Market, Exchange } from "ccxt";

export interface IExchange {
  isPaper: boolean;
  isDemo: boolean;

  ccxt: Exchange;
  exchangeCode: ExchangeCode;

  destroy: () => Promise<void>;

  loadMarkets: () => Promise<Record<string, Market>>; // forward to `ccxt.loadMarkets`

  accountAssets: () => Promise<IAccountAsset[]>;
  getLimitOrder: (body: IGetLimitOrderRequest) => Promise<IGetLimitOrderResponse>;
  placeOrder: (body: IPlaceOrderRequest) => Promise<IPlaceOrderResponse>;
  placeLimitOrder: (body: IPlaceLimitOrderRequest) => Promise<IPlaceLimitOrderResponse>;
  placeMarketOrder: (boyd: IPlaceMarketOrderRequest) => Promise<IPlaceMarketOrderResponse>;
  cancelLimitOrder: (body: ICancelLimitOrderRequest) => Promise<ICancelLimitOrderResponse>;
  placeStopOrder: (body: IPlaceStopOrderRequest) => Promise<IPlaceStopOrderResponse>;
  getOpenOrders: (body: IGetOpenOrdersRequest) => Promise<IGetOpenOrdersResponse>;
  getClosedOrders: (body: IGetClosedOrdersRequest) => Promise<IGetClosedOrdersResponse>;
  getTicker: (symbol: string) => Promise<ITicker>;
  getMarketPrice: (params: IGetMarketPriceRequest) => Promise<IGetMarketPriceResponse>;
  getCandlesticks: (params: IGetCandlesticksRequest) => Promise<ICandlestick[]>;
  getSymbols: () => Promise<ISymbolInfo[]>;
  getSymbol: (params: IGetSymbolInfoRequest) => Promise<ISymbolInfo>;
  watchOrders: (params?: IWatchOrdersRequest) => Promise<IWatchOrdersResponse>;
  watchCandles: (symbol: IWatchCandlesRequest) => Promise<ICandlestick[]>;
  watchTrades: (symbol: IWatchTradesRequest) => Promise<IWatchTradesResponse>;
  getOrderbook: (symbol: string) => Promise<IOrderbook>;
  watchOrderbook: (symbol: string) => Promise<IOrderbook>;
  watchTicker: (symbol: string) => Promise<ITicker>;
}
