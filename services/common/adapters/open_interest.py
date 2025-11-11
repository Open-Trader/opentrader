import datetime as dt
import requests
import pandas as pd
from typing import List, Dict, Optional

def fetch_open_interest_binance(symbol: str) -> Optional[float]:
    """Fetch real OI from Binance without API key"""
    try:
        sym = symbol.replace("/", "").replace("binance:", "")
        url = f"https://fapi.binance.com/fapi/v1/openInterest?symbol={sym}"
        response = requests.get(url, timeout=10)
        data = response.json()
        return float(data['openInterest']) * 1000  # Convert to approximate USD
    except Exception as e:
        print(f"Binance OI error for {symbol}: {e}")
        return None

def fetch_open_interest_bybit(symbol: str) -> Optional[float]:
    """Fetch real OI from Bybit without API key"""
    try:
        sym = symbol.replace("/", "").replace("bybit:", "")
        url = f"https://api.bybit.com/v5/market/open-interest?category=linear&symbol={sym}&interval=5min"
        response = requests.get(url, timeout=10)
        data = response.json()
        return float(data['result']['list'][0]['openInterest'])
    except Exception as e:
        print(f"Bybit OI error for {symbol}: {e}")
        return None

def fetch_funding_rate_binance(symbol: str) -> Optional[float]:
    """Fetch real funding rate from Binance"""
    try:
        sym = symbol.replace("/", "").replace("binance:", "")
        url = f"https://fapi.binance.com/fapi/v1/fundingRate?symbol={sym}&limit=1"
        response = requests.get(url, timeout=10)
        data = response.json()
        return float(data[0]['fundingRate'])
    except Exception as e:
        print(f"Binance funding error for {symbol}: {e}")
        return None

def fetch_funding_rate_bybit(symbol: str) -> Optional[float]:
    """Fetch real funding rate from Bybit"""
    try:
        sym = symbol.replace("/", "").replace("bybit:", "")
        url = f"https://api.bybit.com/v5/market/funding/history?category=linear&symbol={sym}&limit=1"
        response = requests.get(url, timeout=10)
        data = response.json()
        return float(data['result']['list'][0]['fundingRate'])
    except Exception as e:
        print(f"Bybit funding error for {symbol}: {e}")
        return None

def fetch_open_interest(exchange_pair: str) -> List[Dict]:
    """Get real OI data with fallback to mock"""
    now = dt.datetime.now(dt.timezone.utc).replace(second=0, microsecond=0)
    
    try:
        if exchange_pair.startswith("binance:"):
            oi_value = fetch_open_interest_binance(exchange_pair)
        elif exchange_pair.startswith("bybit:"):
            oi_value = fetch_open_interest_bybit(exchange_pair)
        else:
            oi_value = None
            
        if oi_value is not None:
            return [{"pair": exchange_pair, "ts": now, "value_usd": float(oi_value)}]
            
    except Exception as e:
        print(f"Real OI failed for {exchange_pair}, using mock: {e}")
    
    # Fallback to mock data
    import random
    base = 1_000_000 + random.randint(-50_000, 50_000)
    return [{"pair": exchange_pair, "ts": now, "value_usd": float(base)}]

def fetch_funding_rate(exchange_pair: str, candles_df: pd.DataFrame = None) -> List[Dict]:
    """Get real funding rate data with fallback to mock"""
    now = dt.datetime.now(dt.timezone.utc).replace(second=0, microsecond=0)
    
    try:
        if exchange_pair.startswith("binance:"):
            rate = fetch_funding_rate_binance(exchange_pair)
        elif exchange_pair.startswith("bybit:"):
            rate = fetch_funding_rate_bybit(exchange_pair)
        else:
            rate = None
            
        if rate is not None:
            return [{"pair": exchange_pair, "ts": now, "rate": float(rate)}]
            
    except Exception as e:
        print(f"Real funding failed for {exchange_pair}, using mock: {e}")
    
    # Fallback to mock data
    if candles_df is not None and not candles_df.empty:
        rate = (candles_df["close"].pct_change().fillna(0).tail(1).iloc[0]) / 10
    else:
        import random
        rate = random.uniform(-0.0005, 0.0005)
        
    return [{"pair": exchange_pair, "ts": now, "rate": float(rate)}]