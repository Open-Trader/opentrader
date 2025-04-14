import { createRequire } from 'module';
import { Daemon } from './chunk-QARZYCUO.mjs';
import './chunk-F7O354SE.mjs';

createRequire(import.meta.url);

        if (typeof globalThis.__dirname === "undefined") {
          globalThis.__dirname = new URL('.', import.meta.url).pathname;
        }
        if (typeof globalThis.__filename === "undefined") {
          globalThis.__filename = new URL(import.meta.url).pathname;
        }

// src/standalone.ts
var daemon = await Daemon.create({
  server: {
    frontendDistPath: "../frontend",
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 4e3
  }
});
async function shutdown() {
  await daemon.shutdown();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
