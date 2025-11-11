import pandas as pd
from services.common.config import load_config
from services.common.db import upsert_many
from services.common.adapters.exchanges import fetch_candles
from services.common.adapters.open_interest import fetch_open_interest, fetch_funding_rate
from services.common.adapters.volatility import compute_atr_like
from services.common.adapters.sentiment import fetch_sentiment
from services.common.adapters.headlines import fetch_headlines

cfg = load_config()

def run_ingest_cycle():
    print(f"[ingest] Starting cycle for {len(cfg.symbols)} pairs...")
    
    # Process each trading pair
    for pair in cfg.symbols:
        print(f"[ingest] Processing {pair}...")
        
        # 1. Fetch real candles
        candle_rows = fetch_candles(pair, timeframe="1h", limit=200)
        if candle_rows:
            upsert_many("candles", candle_rows, ["pair","ts"], ["open","high","low","close","volume"])
            print(f"[ingest] Saved {len(candle_rows)} candles for {pair}")

        # 2. Fetch real funding rates (using real adapter)
        df = pd.DataFrame(candle_rows) if candle_rows else pd.DataFrame()
        fr = fetch_funding_rate(pair, df)
        if fr:
            upsert_many("funding_rates", fr, ["pair","ts"], ["rate"])
            print(f"[ingest] Saved funding rate for {pair}")

        # 3. Fetch real open interest
        oi = fetch_open_interest(pair)
        if oi:
            upsert_many("open_interest", oi, ["pair","ts"], ["value_usd"])
            print(f"[ingest] Saved OI for {pair}")

        # 4. Compute volatility from candles
        if not df.empty:
            vol = compute_atr_like(df)
            if vol:
                upsert_many("volatility", vol, ["pair","ts"], ["atr"])
                print(f"[ingest] Saved volatility for {pair}")

        # 5. Fetch sentiment (real with fallback)
        sent = fetch_sentiment(pair)  # Now uses real data with CryptoPanic fallback
        if sent:
            upsert_many("sentiment", sent, ["pair","ts"], ["mentions","score_norm","keywords"])
            print(f"[ingest] Saved sentiment for {pair}")

    # 6. Fetch headlines (real with fallback)
    h = fetch_headlines()  # Now uses real data with CryptoPanic fallback
    if h:
        upsert_many("headlines", h, ["id"], [])
        print(f"[ingest] Saved {len(h)} headlines")

    print("[ingest] Cycle completed successfully!")