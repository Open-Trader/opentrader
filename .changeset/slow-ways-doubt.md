---
"opentrader": minor
"frontend": minor
"processor": minor
---

- Support SL for DCA strategy (#93)
- Added Strategies page
- Improved Orders and Trades tables in UI
- Improved trading engine: Delegate Market and Order events to BotManager/TradeManager
- Move debugging buttons to the bottom in UI
- Added `--host` and `--port` params to CLI (#95)
- Replaced Express.js with Fastify (#90)
- Generate DTS files using dts-bundle-generator (#101)
- Proxying fetch candles request (Gate.io CORS issue)
- Logging improvements
