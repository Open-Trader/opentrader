import os
import pandas as pd
from services.common.db import fetch_df, execute

PROFILE_RULES = {
    "aggressive": {
        "oi_high": 65,
        "oi_low": 30,
        "funding_neg": -0.00002,
        "funding_pos": 0.00002,
        "slope_long": 0.00008,
        "slope_short": -0.00008,
        "sent_spike": 1.2,
    },
    "balanced": {
        "oi_high": 80,
        "oi_low": 40,
        "funding_neg": -0.0001,
        "funding_pos": 0.00005,
        "slope_long": 0.00015,
        "slope_short": -0.00015,
        "sent_spike": 1.5,
    },
    "conservative": {
        "oi_high": 90,
        "oi_low": 45,
        "funding_neg": -0.0002,
        "funding_pos": 0.00012,
        "slope_long": 0.00025,
        "slope_short": -0.00025,
        "sent_spike": 1.8,
    },
}

DEFAULT_PROFILE = os.getenv("SIGNAL_PROFILE", "balanced").lower()
if DEFAULT_PROFILE not in PROFILE_RULES:
    DEFAULT_PROFILE = "balanced"

def _percentile(series: pd.Series, value: float):
    if series.empty:
        return None
    return (series < value).mean() * 100.0

def _resolve_profile(profile: str | None) -> str:
    key = (profile or DEFAULT_PROFILE).lower()
    return key if key in PROFILE_RULES else DEFAULT_PROFILE


def compute_market_stress(pair: str, profile: str | None = None):
    profile_key = _resolve_profile(profile)
    rules = PROFILE_RULES[profile_key]

    oi = fetch_df(
        """
        SELECT ts, value_usd FROM open_interest
        WHERE pair=%(pair)s AND ts > now() - interval '30 days'
        ORDER BY ts
    """,
        {"pair": pair},
    )
    fr = fetch_df(
        """
        SELECT ts, rate FROM funding_rates
        WHERE pair=%(pair)s AND ts > now() - interval '14 days'
        ORDER BY ts
    """,
        {"pair": pair},
    )
    sent = fetch_df(
        """
        SELECT ts, mentions, score_norm, keywords FROM sentiment
        WHERE pair=%(pair)s AND ts > now() - interval '14 days'
        ORDER BY ts
    """,
        {"pair": pair},
    )

    regime = "Unknown"
    bias = "Neutral"
    long_prob = 0.5
    short_prob = 0.5
    summary = "Insufficient data."

    latest_oi = oi["value_usd"].iloc[-1] if not oi.empty else None
    oi_pct = _percentile(oi["value_usd"], latest_oi) if latest_oi is not None else None
    latest_funding = fr["rate"].iloc[-1] if not fr.empty else None

    sent_spike = None
    if not sent.empty:
        sent["liq_kw"] = sent["keywords"].apply(
            lambda d: (d.get("liquidation", 0) if isinstance(d, dict) else 0)
            + (d.get("margin call", 0) if isinstance(d, dict) else 0)
        )
        last_week = sent.tail(max(1, len(sent) // 2))
        first_week = sent.head(len(sent) - len(last_week)) if len(sent) > 1 else sent.head(1)
        base = max(1, first_week["liq_kw"].sum())
        sent_spike = (last_week["liq_kw"].sum()) / base

    candles = fetch_df(
        """
            SELECT ts, close FROM candles WHERE pair=%(pair)s ORDER BY ts DESC LIMIT 60
        """,
        {"pair": pair},
    ).sort_values("ts")
    slope = 0.0
    if not candles.empty:
        y = candles["close"].pct_change().fillna(0).tail(12)
        slope = y.mean()

    data_points = sum(
        [
            1 if latest_oi is not None else 0,
            1 if latest_funding is not None else 0,
            1 if not candles.empty else 0,
        ]
    )

    if data_points >= 1:
        if (
            oi_pct is not None
            and latest_funding is not None
            and oi_pct >= rules["oi_high"]
            and latest_funding <= rules["funding_neg"]
            and (sent_spike is None or sent_spike >= rules["sent_spike"])
        ):
            regime = "Risky / High Liquidation Risk"
            bias = "Short"
            long_prob = 0.2
            short_prob = 0.8
            summary = (
                f"[{profile_key.capitalize()}] OI in {rules['oi_high']}th pct+, funding ≤ "
                f"{rules['funding_neg']*10000:.1f} bps, and stress chatter elevated."
            )
        else:
            long_tailwind = False
            short_headwind = False

            if slope > rules["slope_long"]:
                long_tailwind = True
            if slope < rules["slope_short"]:
                short_headwind = True

            if latest_funding is not None:
                if latest_funding > rules["funding_pos"]:
                    long_tailwind = True
                if latest_funding < rules["funding_neg"]:
                    short_headwind = True

            if oi_pct is not None:
                if oi_pct >= rules["oi_high"]:
                    short_headwind = True
                if oi_pct <= rules["oi_low"]:
                    long_tailwind = True

            if long_tailwind and not short_headwind:
                regime = "Constructive"
                bias = "Long"
                long_prob = 0.7
                short_prob = 0.3
                summary = (
                    f"[{profile_key.capitalize()}] Momentum/funding tailwinds favour longs; monitor for follow-through."
                )
            elif short_headwind and not long_tailwind:
                regime = "Weak"
                bias = "Short"
                long_prob = 0.3
                short_prob = 0.7
                summary = (
                    f"[{profile_key.capitalize()}] Elevated OI or negative funding tilts short; watch for squeeze risk."
                )
            elif long_tailwind and short_headwind:
                regime = "Cross Currents"
                bias = "Flat"
                long_prob = 0.5
                short_prob = 0.5
                summary = (
                    f"[{profile_key.capitalize()}] Drivers conflict (momentum vs positioning); stay nimble."
                )
            else:
                regime = "Balanced / Choppy"
                bias = "Flat"
                long_prob = 0.5
                short_prob = 0.5
                summary = (
                    f"[{profile_key.capitalize()}] No clear edge from funding, momentum, or OI; favour range setups."
                )

    return {
        "pair": pair,
        "regime": regime,
        "bias": bias,
        "long_prob": float(long_prob),
        "short_prob": float(short_prob),
        "summary": summary,
        "profile": profile_key,
    }

def compute_all_signals(profile: str | None = None):
    profile_key = _resolve_profile(profile)
    pairs_df = fetch_df("SELECT DISTINCT pair FROM candles")
    pairs = list(pairs_df["pair"]) if "pair" in pairs_df else []
    out = []
    for p in pairs:
        s = compute_market_stress(p, profile_key)
        out.append(s)
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc)
    rows = [{
        "ts": now, "pair": s["pair"], "regime": s["regime"], "bias": s["bias"],
        "long_prob": s["long_prob"], "short_prob": s["short_prob"], "summary": s["summary"],
    } for s in out]
    if rows:
        sql = """
        INSERT INTO signals (ts, pair, regime, bias, long_prob, short_prob, summary)
        VALUES (%(ts)s, %(pair)s, %(regime)s, %(bias)s, %(long_prob)s, %(short_prob)s, %(summary)s)
        """
        for row in rows:
            execute(sql, row)

def signal_explanations(profile: str | None = None):
    profile_key = _resolve_profile(profile)
    rules = PROFILE_RULES[profile_key]
    return {
        "market_stress": (
            f"Risky trigger when open interest hits the {rules['oi_high']}th percentile, "
            f"funding ≤ {rules['funding_neg']*10000:.1f} bps, and liquidation chatter ≥ {rules['sent_spike']}× baseline."
        ),
        "momentum": (
            f"Long tailwind needs slope ≥ {rules['slope_long']*10000:.1f} bps/hr or funding ≥ {rules['funding_pos']*10000:.1f} bps. "
            f"Short tailwind kicks in below {rules['slope_short']*10000:.1f} bps/hr or if funding ≤ {rules['funding_neg']*10000:.1f} bps."
        ),
    }
