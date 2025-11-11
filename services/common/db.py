import os, psycopg2, pandas as pd
from psycopg2.extras import execute_values, Json
from services.common.config import load_config

_cfg = load_config()

def _conn():
    url = os.getenv("DATABASE_URL")
    if url:
        return psycopg2.connect(url)
    return psycopg2.connect(
        host=_cfg.pg_host, port=_cfg.pg_port, dbname=_cfg.pg_db,
        user=_cfg.pg_user, password=_cfg.pg_pass
    )

def execute(sql, params=None):
    with _conn() as conn, conn.cursor() as cur:
        cur.execute(sql, params or {})

def fetch_df(sql, params=None) -> pd.DataFrame:
    with _conn() as conn:
        return pd.read_sql(sql, conn, params=params)

def upsert_many(table: str, rows: list[dict], conflict_cols: list[str], update_cols: list[str]):
    if not rows:
        return
    def _coerce(value):
        if isinstance(value, (dict, list)):
            return Json(value)
        return value
    cols = list(rows[0].keys())
    vals = [[_coerce(r[c]) for c in cols] for r in rows]
    on_conflict = ", ".join(conflict_cols)
    if update_cols:
        updates = ", ".join([f"{c}=EXCLUDED.{c}" for c in update_cols])
        conflict_clause = f"ON CONFLICT ({on_conflict}) DO UPDATE SET {updates}"
    else:
        conflict_clause = f"ON CONFLICT ({on_conflict}) DO NOTHING"
    sql = f"""
    INSERT INTO {table} ({",".join(cols)})
    VALUES %s
    {conflict_clause}
    """
    with _conn() as conn, conn.cursor() as cur:
        execute_values(cur, sql, vals)

def ensure_schema():
    from services.common.schema import SCHEMA_SQL
    execute(SCHEMA_SQL)
    _try_apply_timescale()

def _try_apply_timescale():
    # Silently attempt to enable Timescale and create hypertables/CAGGs
    try:
        from pathlib import Path
        path = Path(__file__).parent / "schema_timescale.sql"
        if path.exists():
            sql = path.read_text(encoding="utf-8")
            with _conn() as conn, conn.cursor() as cur:
                cur.execute(sql)
    except Exception:
        pass  # extension may be unavailable; that's fine
