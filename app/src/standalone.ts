import { App } from "@opentrader/bot";

const app = await App.create({
  server: {
    frontendDistPath: "../frontend",
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 4000,
  },
});

async function shutdown() {
  await app.shutdown();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
