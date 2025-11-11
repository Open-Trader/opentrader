-- Enable TimescaleDB extension if available
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Convert base tables to hypertables if not already
SELECT create_hypertable('candles', 'ts', if_not_exists => TRUE);
SELECT create_hypertable('funding_rates', 'ts', if_not_exists => TRUE);
SELECT create_hypertable('open_interest', 'ts', if_not_exists => TRUE);
SELECT create_hypertable('volatility', 'ts', if_not_exists => TRUE);
SELECT create_hypertable('sentiment', 'ts', if_not_exists => TRUE);
SELECT create_hypertable('signals', 'ts', if_not_exists => TRUE);

-- Add indexes for faster filtering by 'pair'
CREATE INDEX IF NOT EXISTS idx_candles_pair_ts ON candles (pair, ts DESC);
CREATE INDEX IF NOT EXISTS idx_funding_rates_pair_ts ON funding_rates (pair, ts DESC);
CREATE INDEX IF NOT EXISTS idx_open_interest_pair_ts ON open_interest (pair, ts DESC);
CREATE INDEX IF NOT EXISTS idx_volatility_pair_ts ON volatility (pair, ts DESC);
CREATE INDEX IF NOT EXISTS idx_sentiment_pair_ts ON sentiment (pair, ts DESC);
CREATE INDEX IF NOT EXISTS idx_signals_pair_ts ON signals (pair, ts DESC);

-- Create continuous aggregate for candles 1-hour data with auto-refresh
CREATE MATERIALIZED VIEW IF NOT EXISTS candles_1h
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', ts) AS bucket,
    pair,
    first(open, ts) AS o,
    max(high) AS h,
    min(low) AS l,
    last(close, ts) AS c,
    sum(volume) AS v
FROM candles
GROUP BY 1, 2;

-- Add continuous aggregate refresh policy for candles_1h
SELECT add_continuous_aggregate_policy(
    'candles_1h',
    start_offset => INTERVAL '3 days',
    end_offset => INTERVAL '5 minutes',
    schedule_interval => INTERVAL '15 minutes'
);

-- Monitor hypertable chunk sizes and adjust chunk_time_interval as needed
-- Example: ALTER TABLE candles SET (timescaledb.chunk_time_interval = INTERVAL '1 day');
