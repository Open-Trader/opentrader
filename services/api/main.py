import os
from fastapi import FastAPI, Query, BackgroundTasks
from services_common.db import fetch_df, ensure_schema
from services_common.ingest import run_ingest_cycle
from services_common.signals import (
    compute_market_stress,
    signal_explanations,
    compute_all_signals,
)
from services_common.config import load_config

app = FastAPI(title="Crypto Risk API", version="0.2.0")
cfg = load_config()

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/pairs")
def pairs():
    return {"pairs": cfg.symbols}

@app.get("/signals")
def get_signals(pairs: str | None = Query(None), profile: str = Query("balanced")):
    pairs_list = [p.strip() for p in pairs.split(",")] if pairs else cfg.symbols
    data = {}
    resolved_profile = None
    for p in pairs_list:
        signal = compute_market_stress(p, profile)
        resolved_profile = resolved_profile or signal.get("profile")
        data[p] = signal
    return {
        "signals": data,
        "profile": resolved_profile or profile,
        "explanations": signal_explanations(profile),
    }

def _run_manual_cycle():
    ensure_schema()
    run_ingest_cycle()
    compute_all_signals(os.getenv("SIGNAL_PROFILE"))

@app.post("/ingest")
def manual_ingest(background_tasks: BackgroundTasks):
    """Trigger a best-effort ingest cycle in the background."""
    background_tasks.add_task(_run_manual_cycle)
    return {"status": "queued", "message": "Manual ingest started in background."}

@app.get("/timeseries/{metric}")
def timeseries(metric: str, pair: str, limit: int = 500):
    table_map = {
        "candles": "candles",
        "funding": "funding_rates",
        "oi": "open_interest",
        "vol": "volatility",
        "sentiment": "sentiment"
    }
    if metric not in table_map:
        return {"error": "unknown metric"}
    table = table_map[metric]
    q = f"""
        SELECT * FROM {table}
        WHERE pair = %(pair)s
        ORDER BY ts DESC
        LIMIT %(limit)s
    """
    df = fetch_df(q, {"pair": pair, "limit": limit})
    return {"columns": list(df.columns), "rows": df.to_dict(orient="records")}
