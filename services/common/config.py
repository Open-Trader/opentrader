import os
from dataclasses import dataclass

@dataclass
class Config:
    pg_user: str
    pg_pass: str
    pg_db: str
    pg_host: str
    pg_port: int
    redis_url: str
    symbols: list[str]

def load_config() -> Config:
    default_symbols_str = (
        "binance:BTC/USDT,binance:ETH/USDT,binance:SOL/USDT,binance:BNB/USDT,"
        "binance:XRP/USDT,binance:DOGE/USDT,binance:ADA/USDT,binance:AVAX/USDT,"
        "binance:TRX/USDT,binance:DOT/USDT,binance:LINK/USDT,binance:MATIC/USDT,"
        "binance:UNI/USDT,binance:APT/USDT,binance:ARB/USDT,binance:ATOM/USDT,"
        "binance:OP/USDT,binance:SEI/USDT,binance:NEAR/USDT,binance:INJ/USDT,"
        "bybit:BTC/USDT,bybit:ETH/USDT,bybit:SOL/USDT,bybit:XRP/USDT,"
        "bybit:DOGE/USDT,bybit:ADA/USDT,bybit:LINK/USDT,bybit:MATIC/USDT,"
        "bybit:NEAR/USDT,bybit:APT/USDT"
    )
    default_symbols = [s.strip() for s in default_symbols_str.split(",") if s.strip()]
    symbols_env = os.getenv("SYMBOLS")
    if symbols_env:
        symbols = [s.strip() for s in symbols_env.split(",") if s.strip()]
        if len(symbols) < len(default_symbols):
            merged = symbols + default_symbols
            symbols = list(dict.fromkeys(merged))
    else:
        symbols = default_symbols
    return Config(
        pg_user=os.getenv("POSTGRES_USER","cryptouser"),
        pg_pass=os.getenv("POSTGRES_PASSWORD","cryptopass"),
        pg_db=os.getenv("POSTGRES_DB","cryptodb"),
        pg_host=os.getenv("POSTGRES_HOST","db"),
        pg_port=int(os.getenv("POSTGRES_PORT","5432")),
        redis_url=os.getenv("REDIS_URL","redis://redis:6379/0"),
        symbols=symbols
    )
