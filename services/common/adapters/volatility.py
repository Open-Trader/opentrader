import pandas as pd
def compute_atr_like(candles_df: pd.DataFrame, window=14):
    if candles_df.empty:
        return None
    df = candles_df.copy().sort_values("ts")
    hl = df["high"] - df["low"]
    hc = (df["high"] - df["close"].shift()).abs()
    lc = (df["low"] - df["close"].shift()).abs()
    tr = pd.concat([hl, hc, lc], axis=1).max(axis=1)
    atr = tr.rolling(window).mean()
    last = df["ts"].iloc[-1]
    return [{"pair": df["pair"].iloc[-1], "ts": last, "atr": float(atr.iloc[-1])}]
