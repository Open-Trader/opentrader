import os
from typing import Optional

import requests
from services.common.db import fetch_df


def _telegram_credentials() -> Optional[tuple[str, str]]:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if token and chat_id:
        return token, chat_id
    return None


def maybe_notify_top_signals(limit: int = 3) -> None:
    creds = _telegram_credentials()
    if not creds:
        return
    token, chat_id = creds
    data = fetch_df(
        """
        WITH ordered AS (
            SELECT
                pair,
                ts,
                regime,
                bias,
                long_prob,
                short_prob,
                summary,
                ROW_NUMBER() OVER (PARTITION BY pair ORDER BY ts DESC) AS rn
            FROM signals
        )
        SELECT pair, regime, bias, long_prob, short_prob, summary
        FROM ordered
        WHERE rn = 1
        ORDER BY GREATEST(long_prob, short_prob) DESC
        LIMIT %(limit)s
        """,
        {"limit": limit},
    )
    if data.empty:
        return

    lines = ["🔥 *Top Signal Update* 🔥"]
    for _, row in data.iterrows():
        strength = max(float(row.get("long_prob", 0)), float(row.get("short_prob", 0)))
        direction = "Long" if float(row.get("long_prob", 0)) >= float(row.get("short_prob", 0)) else "Short"
        lines.append(
            f"*{row['pair']}* → `{row['regime']}` · Bias: *{row['bias']}* "
            f"· Top: *{direction}* ({strength*100:.1f}%)"
        )
        summary = row.get("summary")
        if isinstance(summary, str) and summary:
            lines.append(f"_Summary_: {summary}")
        lines.append("")

    message = "\n".join(lines).strip()
    try:
        resp = requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={"chat_id": chat_id, "text": message, "parse_mode": "Markdown"},
            timeout=10,
        )
        resp.raise_for_status()
    except Exception as exc:
        # Fail silently so worker continues even if Telegram is misconfigured.
        print(f"[notifications] Telegram send failed: {exc}")
