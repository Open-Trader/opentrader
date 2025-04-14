import { createRequire } from 'module';
import { getSettings } from './chunk-LM7I6YYA.mjs';
import { Daemon } from './chunk-QARZYCUO.mjs';
import './chunk-F7O354SE.mjs';

createRequire(import.meta.url);

        if (typeof globalThis.__dirname === "undefined") {
          globalThis.__dirname = new URL('.', import.meta.url).pathname;
        }
        if (typeof globalThis.__filename === "undefined") {
          globalThis.__filename = new URL(import.meta.url).pathname;
        }

// src/api/up/daemon.ts
var { host, port } = getSettings();
var daemon = await Daemon.create({
  server: {
    frontendDistPath: "../frontend",
    host,
    port
  }
});
async function shutdown() {
  await daemon.shutdown();
  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
