import os
from datetime import datetime
from zoneinfo import ZoneInfo

import pandas as pd
import requests
import streamlit as st
from urllib.parse import urlencode
from typing import Optional, List, Tuple
import plotly.graph_objects as go

PROFILE_LABELS = {
    "Aggressive (fast triggers)": "aggressive",
    "Balanced (default)": "balanced",
    "Conservative (high confidence)": "conservative",
}
DEFAULT_PROFILE_KEY = "balanced"
LOCAL_TZ = ZoneInfo("Europe/Amsterdam")

DEFAULT_CANDIDATES = [
    "https://crypto-risk-api-production.up.railway.app",
    "https://crypto-risk-api.onrender.com",
    "http://api:8000",
    "http://localhost:8000",
]

def probe_api(base: str, timeout: float = 2.0) -> bool:
    try:
        r = requests.get(f"{base}/health", timeout=timeout)
        return r.ok and r.json().get("ok") is True
    except Exception:
        return False

def resolve_api_base() -> Optional[str]:
    """Resolve API base URL from environment or known candidates."""
    env_base = os.getenv("API_BASE", "").strip()
    if env_base and probe_api(env_base):
        return env_base
    env_candidates = os.getenv("API_CANDIDATES", "")
    candidates = [c.strip() for c in env_candidates.split(",") if c.strip()] if env_candidates else []
    seen, merged = set(), []
    for x in (candidates + DEFAULT_CANDIDATES):
        if x not in seen:
            merged.append(x)
            seen.add(x)
    for base in merged:
        if probe_api(base):
            return base
    return None

API_BASE = resolve_api_base()

st.set_page_config(page_title="Crypto Risk Dashboard", layout="wide")

# Minimal CSS tweaks for a softer, modern look
st.markdown(
    """
    <style>
    .main {
        background: radial-gradient(circle at top left, #101726, #05070f);
        color: #f5f7ff;
    }
    .stApp {
        background: transparent;
    }
    h1, h2, h3, h4 {
        color: #f5f7ff !important;
    }
    .rounded-card {
        background: rgba(15, 23, 42, 0.55);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 20px;
        padding: 1.2rem 1.5rem;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.3);
        margin-bottom: 1.5rem;
    }
    .snapshot-card {
        padding: 0.9rem 1.1rem;
        border-radius: 16px;
    }
    .snapshot-symbol {
        font-size: 0.85rem;
        color: #cdd4ff;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }
    .snapshot-price {
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0.25rem 0 0.35rem;
    }
    .snapshot-change {
        font-size: 0.85rem;
    }
    .signal-driver {
        background: rgba(15, 23, 42, 0.65);
        border: 1px solid rgba(99, 102, 241, 0.25);
        border-radius: 18px;
        padding: 1rem 1.25rem;
        margin-bottom: 1rem;
    }
    .signal-driver-title {
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        color: #94a3b8;
        text-transform: uppercase;
    }
    .signal-driver-value {
        font-size: 1.4rem;
        font-weight: 700;
        color: #e2e8f0;
        margin: 0.2rem 0;
    }
    .signal-driver-desc {
        font-size: 0.9rem;
        color: #cbd5f5;
    }
    .signal-pill {
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 16px;
        padding: 0.75rem 1rem;
        margin-bottom: 0.5rem;
    }
    .signal-pill-title {
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #94a3b8;
    }
    .signal-pill-value {
        font-size: 1.6rem;
        font-weight: 700;
        color: #e2e8f0;
        line-height: 1.1;
    }
    button[data-baseweb="button"],
    div.stButton > button {
        border-radius: 999px !important;
        border: 1px solid rgba(99, 102, 241, 0.35);
        font-weight: 600;
        background: #4338ca;
        color: #f8fafc;
        box-shadow: 0 10px 20px rgba(67, 56, 202, 0.35);
        text-shadow: none;
    }
    button[data-baseweb="button"]:hover,
    div.stButton > button:hover {
        background: #4f46e5;
        box-shadow: 0 12px 24px rgba(79, 70, 229, 0.45);
    }
    .stTabs [data-baseweb="tab"] {
        border-radius: 999px !important;
        padding: 0.35rem 1.35rem;
        font-weight: 600;
    }
    .stTabs [aria-selected="true"] {
        background: rgba(99, 102, 241, 0.2);
        color: #c7d2fe !important;
    }
    .stMetric {
        background: rgba(15, 23, 42, 0.65);
        border-radius: 18px;
        padding: 1rem;
        border: 1px solid rgba(148, 163, 184, 0.15);
    }
    .stMetric label {
        color: #cbd5f5 !important;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.title("Crypto Risk Dashboard")
st.caption("Graphs, Meters, and Hot Signals")

st.caption(
    f"Live time: {datetime.now(LOCAL_TZ).strftime('%d %b %Y · %H:%M:%S')} (GMT+1 Amsterdam)"
)

if not API_BASE:
    st.error("Could not locate the API automatically.")
    manual = st.text_input("Enter your API base URL (e.g., https://crypto-risk-api-production.up.railway.app)")
    if manual and probe_api(manual):
        API_BASE = manual
        st.success("Connected!")

if not API_BASE:
    st.error("Could not connect to API backend. Please ensure the API is running and reachable.")
    st.stop()

@st.cache_data(ttl=300)
def fetch_pairs() -> list[str]:
    try:
        resp = requests.get(f"{API_BASE}/pairs", timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("pairs", ["binance:BTC/USDT"])
    except Exception as e:
        st.error(f"Error fetching pairs: {e}")
        return ["binance:BTC/USDT"]

@st.cache_data(ttl=300)
def fetch_timeseries(metric: str, pair: str, limit: int = 500) -> Optional[pd.DataFrame]:
    qs = urlencode({"pair": pair, "limit": limit})
    url = f"{API_BASE}/timeseries/{metric}?{qs}"
    try:
        r = requests.get(url, timeout=20)
        r.raise_for_status()
        payload = r.json()
        rows = payload.get("rows", [])
        if not rows:
            return None
        df = pd.DataFrame(rows)
        if "ts" in df.columns:
            df["ts"] = pd.to_datetime(df["ts"], utc=True)
            df = df.set_index("ts").tz_convert(LOCAL_TZ)
        return df
    except Exception as e:
        st.error(f"Error fetching timeseries {metric}: {e}")
        return None

@st.cache_data(ttl=120)
def fetch_signals(pairs: list[str], profile: str) -> dict:
    try:
        params = {}
        if pairs:
            params["pairs"] = ",".join(pairs)
        if profile:
            params["profile"] = profile
        r = requests.get(f"{API_BASE}/signals", params=params, timeout=20)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        st.error(f"Error fetching signals: {e}")
        return {}

def trigger_manual_ingest() -> tuple[bool, str]:
    """Call the API endpoint to trigger a one-off ingest cycle."""
    try:
        resp = requests.post(f"{API_BASE}/ingest", timeout=10)
        resp.raise_for_status()
        payload = resp.json() if resp.headers.get("content-type","").startswith("application/json") else {}
        message = payload.get("message") or "Manual ingest triggered. Give it a few seconds to populate."
        return True, message
    except Exception as exc:
        return False, str(exc)


COINGECKO_IDS = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "SOL": "solana",
    "BNB": "binancecoin",
    "XRP": "ripple",
    "ADA": "cardano",
    "DOGE": "dogecoin",
    "AVAX": "avalanche-2",
    "DOT": "polkadot",
    "LINK": "chainlink",
}

COINCAP_IDS = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "SOL": "solana",
    "BNB": "binance-coin",
    "XRP": "ripple",
    "ADA": "cardano",
    "DOGE": "dogecoin",
    "AVAX": "avalanche",
    "TRX": "tron",
    "DOT": "polkadot",
    "LINK": "chainlink",
    "MATIC": "polygon",
    "UNI": "uniswap",
    "APT": "aptos",
    "ARB": "arbitrum",
    "ATOM": "cosmos",
    "OP": "optimism",
    "SEI": "sei-network",
    "NEAR": "near",
    "INJ": "injective-protocol",
}


def extract_base_symbols(pairs: list[str]) -> list[str]:
    bases = []
    for raw in pairs:
        try:
            base = raw.split(":", 1)[1] if ":" in raw else raw
            base = base.split("/", 1)[0]
            bases.append(base.upper())
        except Exception:
            continue
    return list(dict.fromkeys(bases))


@st.cache_data(ttl=60)
def fetch_market_snapshot(pairs: list[str]) -> dict[str, dict]:
    symbols = extract_base_symbols(pairs)
    ids = [COINGECKO_IDS[s] for s in symbols if s in COINGECKO_IDS]
    if not ids:
        return {}
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": ",".join(ids),
        "vs_currencies": "usd",
        "include_24hr_change": "true",
        "include_last_updated_at": "true",
    }
    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        payload = resp.json()
        simplified = {}
        for symbol, cg_id in COINGECKO_IDS.items():
            if cg_id in payload:
                entry = payload[cg_id]
                simplified[symbol] = {
                    "price": entry.get("usd"),
                    "change": entry.get("usd_24h_change"),
                    "updated": entry.get("last_updated_at"),
                }
        return simplified
    except Exception as exc:
        st.warning(f"Unable to fetch live market snapshot: {exc}")
    return {}


def build_aggr_trade_url(pair: str) -> str:
    target = pair.split(":", 1)[-1].replace("/", "").upper()
    return f"https://aggr.trade/?pair={target}"

def summarize_signal_drivers(cache: dict[str, Optional[pd.DataFrame]]) -> List[Tuple[str, str, str]]:
    drivers: List[Tuple[str, str, str]] = []

    oi = cache.get("oi")
    if oi is not None and not oi.empty:
        latest_oi = oi.iloc[-1]
        latest_val = latest_oi.get("value_usd", latest_oi.iloc[-1] if hasattr(latest_oi, "iloc") else None)
        if pd.notnull(latest_val):
            pct = (oi["value_usd"] < latest_val).mean() * 100 if "value_usd" in oi.columns else None
            desc = "Higher than most of the last 30 days." if pct and pct >= 70 else "Close to typical positioning."
            if pct and pct <= 35:
                desc = "Lighter positioning than usual."
            drivers.append(
                (
                    "Open Interest",
                    f"{latest_val/1_000_000:,.1f}M USD" if latest_val else "n/a",
                    f"Approx. {pct:.0f}th percentile · {desc}" if pct is not None else desc,
                )
            )

    funding = cache.get("funding")
    if funding is not None and not funding.empty:
        col = "rate" if "rate" in funding.columns else funding.columns[-1]
        latest_rate = funding[col].iloc[-1]
        avg_rate = funding[col].tail(24).mean()
        sentiment = "longs paying" if latest_rate > 0 else "shorts paying" if latest_rate < 0 else "neutral"
        drivers.append(
            (
                "Funding",
                f"{latest_rate*10000:+.1f} bps",
                f"{sentiment}; 24h avg {avg_rate*10000:+.1f} bps.",
            )
        )

    candles = cache.get("candles")
    if candles is not None and not candles.empty:
        closes = candles["close"]
        slope = closes.pct_change().rolling(window=12, min_periods=6).mean().iloc[-1]
        slope_bps = slope * 10000 if pd.notnull(slope) else 0
        if pd.notnull(slope):
            direction = "Upside pressure" if slope > 0 else "Downside pressure" if slope < 0 else "Flat momentum"
            drivers.append(
                (
                    "Momentum",
                    f"{slope_bps:+.1f} bps/hr",
                    f"{direction} based on the last ~12 hours of closes.",
                )
            )

    sentiment_df = cache.get("sentiment")
    if sentiment_df is not None and not sentiment_df.empty and "keywords" in sentiment_df.columns:
        latest_kw = sentiment_df["keywords"].dropna().iloc[-1] if not sentiment_df["keywords"].dropna().empty else {}
        if isinstance(latest_kw, dict):
            fear_terms = ["liquidation", "margin call", "crash", "dump"]
            bull_terms = ["rally", "surge", "pump", "bull"]
            fear_count = sum(latest_kw.get(term, 0) for term in fear_terms)
            bull_count = sum(latest_kw.get(term, 0) for term in bull_terms)
            tone = "Bearish chatter dominates." if fear_count > bull_count else "Bullish chatter dominates." if bull_count > fear_count else "Chatter balanced."
            drivers.append(
                (
                    "Headline Tone",
                    f"Fear {fear_count} vs Bull {bull_count}",
                    tone,
                )
            )

    return drivers

@st.cache_data(ttl=600)
def fetch_fear_greed() -> Optional[dict]:
    try:
        resp = requests.get("https://api.alternative.me/fng/?limit=1", timeout=10)
        resp.raise_for_status()
        data = resp.json()
        if not data.get("data"):
            return None
        entry = data["data"][0]
        return {
            "value": float(entry.get("value", 0)),
            "classification": entry.get("value_classification", "n/a"),
            "updated": entry.get("timestamp"),
        }
    except Exception:
        return None

@st.cache_data(ttl=180)
def fetch_asset_flows(pairs: list[str]) -> dict[str, dict]:
    symbols = extract_base_symbols(pairs)
    ids = [COINCAP_IDS[s] for s in symbols if s in COINCAP_IDS]
    try:
        params = {"limit": 5}
        if ids:
            params = {"ids": ",".join(ids)}
        resp = requests.get("https://api.coincap.io/v2/assets", params=params, timeout=10)
        resp.raise_for_status()
        data = resp.json().get("data", [])
        if not data and not ids:
            return {}
        if not data and ids:
            # fallback to global top assets if specific ids missing
            resp = requests.get("https://api.coincap.io/v2/assets", params={"limit": 5}, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("data", [])
        out: dict[str, dict] = {}
        for asset in data:
            symbol = asset.get("symbol")
            if not symbol:
                continue
            try:
                out[symbol.upper()] = {
                    "price": float(asset.get("priceUsd") or 0),
                    "volume": float(asset.get("volumeUsd24Hr") or 0),
                    "change": float(asset.get("changePercent24Hr") or 0),
                    "market_cap": float(asset.get("marketCapUsd") or 0),
                }
            except (TypeError, ValueError):
                continue
        return out
    except Exception:
        return {}

@st.cache_data(ttl=600)
def fetch_alt_global() -> Optional[dict]:
    try:
        resp = requests.get("https://api.alternative.me/v2/global/?convert=USD", timeout=10)
        resp.raise_for_status()
        payload = resp.json()
        data = payload.get("data")
        if not isinstance(data, dict):
            return None
        quotes = data.get("quotes") or {}
        usd = quotes.get("USD") if isinstance(quotes, dict) else {}
        return {
            "market_cap": float(usd.get("total_market_cap", 0) or 0),
            "volume": float(usd.get("total_volume_24h", 0) or 0),
            "market_cap_change": float(
                usd.get("total_market_cap_yesterday_percentage_change", 0) or 0
            ),
            "active_cryptos": int(data.get("active_cryptocurrencies", 0) or 0),
            "active_markets": int(data.get("active_markets", 0) or 0),
            "btc_dominance": float(data.get("bitcoin_percentage_of_market_cap", 0) or 0),
        }
    except Exception:
        return None

# Refresh button to clear cache
if "selected_profile_key" not in st.session_state:
    st.session_state["selected_profile_key"] = DEFAULT_PROFILE_KEY

controls = st.columns([1, 1, 1.4])
with controls[0]:
    if st.button("Refresh Data", use_container_width=True):
        fetch_pairs.clear()
        fetch_timeseries.clear()
        fetch_signals.clear()
        fetch_market_snapshot.clear()
        fetch_fear_greed.clear()
        fetch_asset_flows.clear()
        fetch_alt_global.clear()
with controls[1]:
    if st.button("Manual Data Pull", use_container_width=True):
        with st.spinner("Triggering worker ingest…"):
            ok, msg = trigger_manual_ingest()
        if ok:
            fetch_pairs.clear()
            fetch_timeseries.clear()
            fetch_signals.clear()
            fetch_market_snapshot.clear()
            fetch_fear_greed.clear()
            fetch_asset_flows.clear()
            fetch_alt_global.clear()
            st.success(msg)
        else:
            st.error(f"Manual ingest failed: {msg}")

pairs = fetch_pairs()
if not pairs:
    st.warning("No trading pairs available from API.")
    st.stop()

with controls[2]:
    profile_labels = list(PROFILE_LABELS.keys())
    current_key = st.session_state.get("selected_profile_key", DEFAULT_PROFILE_KEY)
    current_label = next((label for label, key in PROFILE_LABELS.items() if key == current_key), profile_labels[1])
    selected_label = st.selectbox(
        "Signal profile",
        profile_labels,
        index=profile_labels.index(current_label),
        help="Choose how strict the signal engine should be.",
    )
    new_profile_key = PROFILE_LABELS[selected_label]
    if new_profile_key != current_key:
        st.session_state["selected_profile_key"] = new_profile_key
        fetch_signals.clear()

profile_key = st.session_state.get("selected_profile_key", DEFAULT_PROFILE_KEY)

if "selected_pair" not in st.session_state or st.session_state["selected_pair"] not in pairs:
    st.session_state["selected_pair"] = pairs[0]

pair = st.session_state["selected_pair"]

limit = 1000

sig_payload = fetch_signals([pair], profile_key) or {}
signals_map = sig_payload.get("signals", {})
explanations = sig_payload.get("explanations", {})
active_profile = sig_payload.get("profile", profile_key)

# Pre-load core time series once so analytics modules can reuse them
ts_cache: dict[str, Optional[pd.DataFrame]] = {
    "candles": fetch_timeseries("candles", pair=pair, limit=limit),
    "funding": fetch_timeseries("funding", pair=pair, limit=limit),
    "oi": fetch_timeseries("oi", pair=pair, limit=limit),
    "vol": fetch_timeseries("vol", pair=pair, limit=limit),
    "sentiment": fetch_timeseries("sentiment", pair=pair, limit=limit),
}

market_snapshot = fetch_market_snapshot(pairs)
with st.expander("Live Market Snapshot", expanded=True):
    if market_snapshot:
        snapshot_rows = []
        for symbol, data in market_snapshot.items():
            snapshot_rows.append(
                {
                    "Symbol": symbol,
                    "Price (USD)": data.get("price"),
                    "24h Δ %": data.get("change"),
                    "Updated": datetime.now(LOCAL_TZ).strftime("%d %b %Y %H:%M"),
                }
            )
        snapshot_df = pd.DataFrame(snapshot_rows).set_index("Symbol")
        styled = snapshot_df.style.format({
            "Price (USD)": "{:.2f}",
            "24h Δ %": "{:+.2f}%",
        }).background_gradient(
            subset=["24h Δ %"], cmap="RdYlGn"
        )
        st.dataframe(styled, use_container_width=True, height=220)
    else:
        st.info("No market snapshot data available yet. Refresh once the worker ingests more data.")

with st.expander("Macro Context", expanded=True):
    macro = st.columns([0.85, 1, 1])
    with macro[0]:
        fg = fetch_fear_greed()
        if fg:
            fg_val = float(fg["value"])
            gauge = go.Figure(
                go.Indicator(
                    mode="gauge+number",
                    value=fg_val,
                    number={"suffix": " / 100", "font": {"color": "#f1f5ff", "size": 32}},
                    title={"text": f"Fear & Greed · {fg['classification']}", "font": {"color": "#e0e7ff"}},
                    gauge={
                        "axis": {"range": [0, 100], "tickwidth": 1, "tickcolor": "#94a3b8"},
                        "bar": {"color": "#a855f7"},
                        "bgcolor": "#0f172a",
                        "borderwidth": 1,
                        "bordercolor": "#6366f1",
                        "steps": [
                            {"range": [0, 25], "color": "#7f1d1d"},
                            {"range": [25, 50], "color": "#b45309"},
                            {"range": [50, 75], "color": "#1f2937"},
                            {"range": [75, 100], "color": "#065f46"},
                        ],
                    },
                )
            )
            gauge.update_layout(
                paper_bgcolor="rgba(15, 23, 42, 0.65)",
                font={"color": "#cdd4ff"},
                height=220,
                margin=dict(l=10, r=10, t=30, b=0),
            )
            st.plotly_chart(gauge, use_container_width=True, config={"displayModeBar": False})
        else:
            st.info("Fear & Greed data is temporarily unavailable.")

    with macro[1]:
        flows = fetch_asset_flows(pairs)
        if flows:
            sorted_rows = sorted(flows.items(), key=lambda kv: kv[1]["volume"], reverse=True)
            top_rows = sorted_rows[:3]
            items = []
            for symbol, info in top_rows:
                vol_usd = info["volume"]
                change = info["change"]
                price = info["price"]
                items.append(
                    f"""
                    <div style="margin-bottom:0.8rem;">
                        <div style="font-size:0.95rem;color:#cdd4ff;">{symbol}</div>
                        <div style="font-size:1.4rem;font-weight:700;">{price:,.2f} USD</div>
                        <div style="font-size:0.85rem;color:#94a3b8;">
                            24h Vol: {vol_usd/1_000_000:,.1f}M • Change: <span style="color:{'#22c55e' if change >=0 else '#ef4444'}">{change:+.2f}%</span>
                        </div>
                    </div>
                    """
                )
            st.markdown(
                "<div class=\"rounded-card\">" + "".join(items) + "<div style=\"font-size:0.75rem;color:#94a3b8;\">Source: coincap.io</div></div>",
                unsafe_allow_html=True,
            )
        else:
            st.info("CoinCap asset metrics unavailable right now.")

    with macro[2]:
        global_data = fetch_alt_global()
        if global_data:
            mc = global_data["market_cap"] / 1_000_000_000 if global_data["market_cap"] else 0
            vol = global_data["volume"] / 1_000_000_000 if global_data["volume"] else 0
            dom = global_data["btc_dominance"]
            change = global_data["market_cap_change"]
            st.markdown(
                f"""
                <div class="rounded-card">
                    <div style="font-size:0.9rem;color:#cdd4ff;">Global Market Overview</div>
                    <div style="font-size:1.3rem;font-weight:700;margin:0.4rem 0 0;">
                        MC: {mc:,.1f}B · 24h Vol: {vol:,.1f}B
                    </div>
                    <div style="font-size:0.95rem;color:#e0e7ff;margin-top:0.3rem;">
                        BTC Dominance: {dom:.1f}% · Change: <span style="color:{'#22c55e' if change >=0 else '#ef4444'}">{change:+.2f}%</span>
                    </div>
                    <div style="font-size:0.8rem;color:#94a3b8;margin-top:0.4rem;">
                        Active Assets: {global_data['active_cryptos']} · Markets: {global_data['active_markets']}
                    </div>
                    <div style="font-size:0.7rem;color:#64748b;margin-top:0.6rem;">Source: alternative.me</div>
                </div>
                """,
                unsafe_allow_html=True,
            )
        else:
            st.info("Alternative.me global metrics unavailable right now.")

with st.expander("Hot Signals", expanded=True):
    st.subheader("Hot Signals")
    st.markdown(
        "Bias scores blend open interest, funding, short-term momentum, and headline tone."
    )
    st.caption(
        f"Profile: {active_profile.capitalize() if active_profile else profile_key.capitalize()} · Adjust via the selector above to change strictness."
    )
    drivers = summarize_signal_drivers(ts_cache)

    if pair in signals_map:
        s = signals_map[pair]
        metric_cols = st.columns(4)
        metrics = [
            ("Market Regime", s.get("regime", "Unknown")),
            ("Bias", s.get("bias", "Neutral")),
            ("Long Prob. %", f"{round(100 * float(s.get('long_prob', 0)), 1):.1f}"),
            ("Short Prob. %", f"{round(100 * float(s.get('short_prob', 0)), 1):.1f}"),
        ]
        for (title, value), col in zip(metrics, metric_cols):
            with col:
                st.markdown(
                    f"""
                    <div class="signal-pill">
                        <div class="signal-pill-title">{title}</div>
                        <div class="signal-pill-value">{value}</div>
                    </div>
                    """,
                    unsafe_allow_html=True,
                )
        summary_text = s.get("summary")
        if summary_text:
            bias_lower = s.get("bias", "").lower()
            callout = st.info
            if bias_lower == "long":
                callout = st.success
            elif bias_lower == "short":
                callout = st.warning
            callout(summary_text)
    else:
        st.write("No signal for selected pair yet.")

    if drivers:
        st.markdown("**Signal Drivers**")
        cols_per_row = 2
        for i in range(0, len(drivers), cols_per_row):
            row = drivers[i : i + cols_per_row]
            columns = st.columns(len(row))
            for (title, value, desc), col in zip(row, columns):
                with col:
                    st.markdown(
                        f"""
                        <div class="signal-driver">
                            <div class="signal-driver-title">{title}</div>
                            <div class="signal-driver-value">{value}</div>
                            <div class="signal-driver-desc">{desc}</div>
                        </div>
                        """,
                        unsafe_allow_html=True,
                    )
    else:
        st.markdown(
            "*Waiting on more data to break down the drivers. Run the worker or refresh once new samples arrive.*"
        )

    if explanations:
        st.markdown("**Scoring Notes**")
        for key, note in explanations.items():
            label = key.replace("_", " ").title()
            st.markdown(f"- **{label}:** {note}")

with st.container():
    selected = st.selectbox(
        "Select trading pair",
        pairs,
        index=pairs.index(pair) if pair in pairs else 0,
        format_func=lambda x: x.replace(":", " · "),
        key="selected_pair",
    )
    if selected != pair:
        st.experimental_rerun()

pair = st.session_state.get("selected_pair", pair)

# Ensure we still have a pair after potential selection change
if not pair:
    st.info("Select a pair to see data.")
    st.stop()

with st.expander(f"Data for Pair: {pair}", expanded=True):
    st.subheader(f"Data for Pair: {pair}")
    st.markdown("Timeseries are displayed in GMT+1 (Amsterdam). Use the tabs below to inspect different market lenses.")

    visual_tabs = st.tabs(["Price Action", "Funding & OI", "Sentiment", "Returns", "Volume & Liquidity", "aggr.trade"])

    with visual_tabs[0]:
        candles = ts_cache["candles"]
        if candles is not None and not candles.empty:
            fig = go.Figure(
                data=[
                    go.Candlestick(
                        x=candles.index,
                        open=candles["open"],
                        high=candles["high"],
                        low=candles["low"],
                        close=candles["close"],
                        name="Price",
                    )
                ]
            )
            fig.update_layout(
                margin=dict(l=0, r=0, t=35, b=0),
                template="plotly_dark",
                title=f"{pair} · Candlestick",
            )
            fig.update_xaxes(title="Time (GMT+1)", rangeslider_visible=False, tickformat="%d %b %H:%M")
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No candles data available.")

    with visual_tabs[1]:
        funding = ts_cache["funding"]
        oi = ts_cache["oi"]
        if funding is not None and not funding.empty and oi is not None and not oi.empty:
            col = "rate" if "rate" in funding.columns else funding.columns[-1]
            oi_col = "value_usd" if "value_usd" in oi.columns else oi.columns[-1]
            merged = funding[[col]].join(oi[[oi_col]], how="inner")
            merged = merged.dropna()
            if merged.empty:
                st.info("Not enough overlapping funding/OI data.")
            else:
                fig = go.Figure()
                fig.add_trace(
                    go.Bar(
                        x=merged.index,
                        y=merged[col] * 10000,
                        name="Funding (bps)",
                        marker_color="#22c55e",
                        opacity=0.6,
                    )
                )
                fig.add_trace(
                    go.Scatter(
                        x=merged.index,
                        y=merged[oi_col] / 1_000_000,
                        name="Open Interest (M USD)",
                        mode="lines",
                        line=dict(color="#38bdf8", width=2),
                        yaxis="y2",
                    )
                )
                fig.update_layout(
                    template="plotly_dark",
                    margin=dict(l=0, r=0, t=35, b=0),
                    yaxis=dict(title="Funding (bps)"),
                    yaxis2=dict(title="OI (Millions USD)", overlaying="y", side="right"),
                    title=f"{pair} · Funding vs Open Interest",
                )
                fig.update_xaxes(title="Time (GMT+1)", tickformat="%d %b %H:%M")
                st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("Funding or open interest data unavailable.")

    with visual_tabs[2]:
        sentiment = ts_cache["sentiment"]
        if sentiment is not None and not sentiment.empty:
            metric = "score_norm" if "score_norm" in sentiment.columns else sentiment.columns[-1]
            fig = go.Figure()
            fig.add_trace(
                go.Scatter(
                    x=sentiment.index,
                    y=sentiment[metric],
                    name="Sentiment",
                    line=dict(color="#f97316"),
                    fill="tozeroy",
                )
            )
            fig.update_layout(
                template="plotly_dark",
                margin=dict(l=0, r=0, t=35, b=0),
                title=f"{pair} · Sentiment Trend",
            )
            fig.update_xaxes(title="Time (GMT+1)", tickformat="%d %b %H:%M")
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No sentiment data available.")

    with visual_tabs[3]:
        candles = ts_cache["candles"]
        if candles is not None and not candles.empty:
            returns = candles["close"].pct_change().dropna()
            if not returns.empty:
                fig = go.Figure(
                    go.Histogram(x=returns * 100, nbinsx=40, marker_color="#8b5cf6")
                )
                fig.update_layout(
                    template="plotly_dark",
                    margin=dict(l=0, r=0, t=35, b=0),
                    title=f"{pair} · Hourly Return Distribution",
                    xaxis_title="Return (%)",
                    yaxis_title="Frequency",
                )
                st.plotly_chart(fig, use_container_width=True)
                st.caption("Helps gauge tail risks and skew in the latest window.")
            else:
                st.info("Not enough data to compute returns yet.")
        else:
            st.info("No candles data available.")

    with visual_tabs[4]:
        candles = ts_cache["candles"]
        oi = ts_cache["oi"]
        if candles is not None and not candles.empty:
            volume_series = candles["volume"] if "volume" in candles.columns else pd.Series(0, index=candles.index)
            fig = go.Figure()
            fig.add_trace(
                go.Bar(
                    x=candles.index,
                    y=volume_series,
                    name="Volume",
                    marker_color="#0ea5e9",
                    opacity=0.6,
                )
            )
            if oi is not None and not oi.empty:
                fig.add_trace(
                    go.Scatter(
                        x=oi.index,
                        y=oi.get("value_usd", oi.iloc[:, 0]) / 1_000_000,
                        name="Open Interest (M USD)",
                        line=dict(color="#facc15", width=2),
                        yaxis="y2",
                    )
                )
            fig.update_layout(
                template="plotly_dark",
                margin=dict(l=0, r=0, t=35, b=0),
                yaxis=dict(title="Volume"),
                yaxis2=dict(title="OI (Millions USD)", overlaying="y", side="right"),
                title=f"{pair} · Volume & Liquidity",
            )
            fig.update_xaxes(title="Time (GMT+1)", tickformat="%d %b %H:%M")
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("Volume data unavailable.")

    with visual_tabs[5]:
        st.write("Live liquidation feed via aggr.trade")
        aggr_url = build_aggr_trade_url(pair)
        st.link_button("Open aggr.trade in new tab", aggr_url)
        st.caption("aggr.trade does not allow in-app embedding, so use the button above to view the live heatmap.")

with st.expander("Insight Modules", expanded=True):
    st.subheader("Insight Modules")
    analysis_tabs = st.tabs(["Funding Overlay", "Volatility Pulse", "Sentiment Radar"])

    with analysis_tabs[0]:
        candles = ts_cache["candles"]
        funding = ts_cache["funding"]
        if candles is None or candles.empty or funding is None or funding.empty:
            st.info("Need both candle and funding data for overlay.")
        else:
            merged = candles[["close"]].join(funding["rate" if "rate" in funding.columns else funding.columns[-1]], how="inner")
            merged = merged.dropna()
            if merged.empty:
                st.info("Not enough overlapping data for overlay.")
            else:
                price_norm = (merged["close"] / merged["close"].iloc[0]) * 100
                funding_bps = merged.iloc[:, 1] * 10000
                fig = go.Figure()
                fig.add_trace(
                    go.Scatter(x=merged.index, y=price_norm, name="Price (norm 100)", line=dict(color="#a855f7"))
                )
                fig.add_trace(
                    go.Scatter(
                        x=merged.index,
                        y=funding_bps,
                        name="Funding (bps)",
                        line=dict(color="#f59e0b", dash="dot"),
                        yaxis="y2",
                    )
                )
                fig.update_layout(
                    template="plotly_dark",
                    yaxis=dict(title="Price (index)"),
                    yaxis2=dict(title="Funding (bps)", overlaying="y", side="right"),
                    margin=dict(l=0, r=0, t=35, b=0),
                )
                fig.update_xaxes(title="Time (GMT+1)", tickformat="%d %b %H:%M")
                st.plotly_chart(fig, use_container_width=True)
                st.markdown(
                    """
                    **How to read this:**
                    - *Price (norm 100)* scales the first data point to 100 so you can focus on directional drift rather than absolute price.
                    - *Funding (bps)* shows whether longs or shorts are paying; persistent positive funding implies long crowding, negatives imply short crowding.
                    - When funding rises while price stalls or drops, be cautious of long squeezes; the inverse can precede short squeezes.
                    - Look for divergences: price grinding higher while funding cools is healthier than price pumping on aggressive positive funding.
                    """
                )

    with analysis_tabs[1]:
        vol = ts_cache["vol"]
        if vol is None or vol.empty:
            st.info("Volatility data not available yet.")
        else:
            series = vol["atr"] if "atr" in vol.columns else vol.iloc[:, 0]
            metric_value = float(series.iloc[-1])
            fig = go.Figure(
                go.Indicator(
                    mode="gauge+number",
                    value=metric_value,
                    title={"text": "ATR Snapshot"},
                    gauge={
                        "axis": {"range": [0, series.max() * 1.2 if series.max() else 1]},
                        "bar": {"color": "#38bdf8"},
                        "bgcolor": "#0f172a",
                        "steps": [
                            {"range": [0, series.median()], "color": "#1e3a8a"},
                            {"range": [series.median(), series.max()], "color": "#0f766e"},
                        ],
                    },
                )
            )
            fig.update_layout(template="plotly_dark", margin=dict(l=0, r=0, t=35, b=0))
            st.plotly_chart(fig, use_container_width=True)
            stats = series.describe().to_frame(name="ATR").T
            st.dataframe(stats)
            st.markdown(
                """
                **How to read this:**
                - *Latest ATR* shows the current absolute true range (volatility proxy).
                - *mean / std* help gauge if today's movement is above its recent norm.
                - A rising *max* or widening *std* often hints at breakout-like conditions.
                - If the latest ATR is near the lower quartile, conditions are typically calmer (range-trading bias).
                - When ATR presses into the upper quartile, tighten risk or look for momentum setups.
                """
            )

    with analysis_tabs[2]:
        sentiment = ts_cache["sentiment"]
        if sentiment is None or sentiment.empty or "keywords" not in sentiment.columns:
            st.info("Sentiment keyword data is not available.")
        else:
            latest = sentiment.dropna(subset=["keywords"]).iloc[-1]
            keywords = latest["keywords"]
            if isinstance(keywords, dict) and keywords:
                df_kw = (
                    pd.DataFrame({"keyword": list(keywords.keys()), "count": list(keywords.values())})
                    .sort_values("count", ascending=False)
                    .head(15)
                )
                fig = go.Figure(
                    go.Bar(
                        x=df_kw["keyword"],
                        y=df_kw["count"],
                        marker_color="#f472b6",
                    )
                )
                fig.update_layout(template="plotly_dark", margin=dict(l=0, r=0, t=35, b=0))
                st.plotly_chart(fig, use_container_width=True)
            else:
                st.info("Latest sentiment entry does not include keyword counts.")
            st.markdown(
                """
                **How to read this:**
                - Bars show the latest counts of sentiment keywords captured from CryptoPanic headlines.
                - Liquidity-stress words (e.g., *liquidation*, *margin call*) signal risk-off chatter; bullish words (e.g., *rally*, *surge*) hint at optimism.
                - Use the mix to contextualise signal bias: a short setup is stronger when bearish terms dominate, and vice versa.
                - Sudden spikes in any keyword bucket often precede volatility bursts—combine with the Funding overlay for higher conviction.
                """
            )

st.divider()
st.caption("Configure pairs, Telegram alerts, and scheduler in .env. Add API keys for live data.")
