import time
import pandas as pd
import datetime as dt
import ccxt
from .open_interest import fetch_funding_rate

def fetch_candles(exchange_pair: str, timeframe="1h", limit=200):
    """Fetch real candles using CCXT"""
    try:
        ex_name, pair = exchange_pair.split(":", 1)
        ex = getattr(ccxt, ex_name)({
            'timeout': 10000,
            'enableRateLimit': True,
        })
        ohlcv = ex.fetch_ohlcv(pair, timeframe=timeframe, limit=limit)
        rows = []
        for t, o, h, l, c, v in ohlcv:
            ts = dt.datetime.utcfromtimestamp(t/1000).replace(tzinfo=dt.timezone.utc)
            rows.append({
                "pair": exchange_pair, 
                "ts": ts, 
                "open": o, 
                "high": h, 
                "low": l, 
                "close": c, 
                "volume": v
            })
        return rows
    except Exception as e:
        print(f"Real candles failed for {exchange_pair}, using mock: {e}")
        return mock_candles(exchange_pair, limit)

def mock_candles(exchange_pair: str, limit=200):
    """Fallback mock candles"""
    import random
    rows = []
    base_price = 50000 if "BTC" in exchange_pair else 3000
    now = dt.datetime.now(dt.timezone.utc).replace(minute=0, second=0, microsecond=0)
    
    for i in range(limit):
        ts = now - dt.timedelta(hours=limit-i-1)
        price = base_price * (1 + random.uniform(-0.1, 0.1))
        rows.append({
            "pair": exchange_pair,
            "ts": ts,
            "open": price * 0.999,
            "high": price * 1.002,
            "low": price * 0.998,
            "close": price,
            "volume": random.uniform(1000, 5000)
        })
    return rows

# Remove mock_funding since we have real funding in open_interest.py