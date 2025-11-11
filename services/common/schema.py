SCHEMA_SQL = '''
CREATE TABLE IF NOT EXISTS candles (
  pair text NOT NULL,
  ts timestamptz NOT NULL,
  open double precision,
  high double precision,
  low double precision,
  close double precision,
  volume double precision,
  PRIMARY KEY (pair, ts)
);

CREATE TABLE IF NOT EXISTS funding_rates (
  pair text NOT NULL,
  ts timestamptz NOT NULL,
  rate double precision,
  PRIMARY KEY (pair, ts)
);

CREATE TABLE IF NOT EXISTS open_interest (
  pair text NOT NULL,
  ts timestamptz NOT NULL,
  value_usd double precision,
  PRIMARY KEY (pair, ts)
);

CREATE TABLE IF NOT EXISTS volatility (
  pair text NOT NULL,
  ts timestamptz NOT NULL,
  atr double precision,
  PRIMARY KEY (pair, ts)
);

CREATE TABLE IF NOT EXISTS sentiment (
  pair text NOT NULL,
  ts timestamptz NOT NULL,
  mentions integer,
  score_norm double precision,
  keywords jsonb,
  PRIMARY KEY (pair, ts)
);

CREATE TABLE IF NOT EXISTS headlines (
  id bigserial PRIMARY KEY,
  ts timestamptz NOT NULL,
  source text,
  title text,
  url text,
  keywords jsonb
);

CREATE TABLE IF NOT EXISTS signals (
  id bigserial PRIMARY KEY,
  ts timestamptz NOT NULL,
  pair text NOT NULL,
  regime text,
  bias text,
  long_prob double precision,
  short_prob double precision,
  summary text
);

CREATE TABLE IF NOT EXISTS kv_store (
  k text PRIMARY KEY,
  v jsonb,
  updated_at timestamptz DEFAULT now()
);
'''
