import { Daemon } from "@opentrader/daemon";

const daemon = await Daemon.create({
  server: {
    frontendDistPath: "../frontend",
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 4000,
  },
});

async function shutdown() {
  await daemon.shutdown();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
