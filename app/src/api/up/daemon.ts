import { App } from "@opentrader/bot";
import { getSettings } from "../../utils/settings.js";

const { host, port } = getSettings();

const app = await App.create({
  server: {
    frontendDistPath: "../frontend",
    host,
    port,
  },
});

async function shutdown() {
  await app.shutdown();

  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
