import { Daemon } from "@opentrader/daemon";
import { getSettings } from "../../utils/settings.js";

const { host, port } = getSettings();

const daemon = await Daemon.create({
  server: {
    frontendDistPath: "../frontend",
    host,
    port,
  },
});

async function shutdown() {
  await daemon.shutdown();

  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
