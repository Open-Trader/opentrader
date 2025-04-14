import { createRequire } from 'module';
import { logger } from './chunk-QARZYCUO.mjs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';

createRequire(import.meta.url);

        if (typeof globalThis.__dirname === "undefined") {
          globalThis.__dirname = new URL('.', import.meta.url).pathname;
        }
        if (typeof globalThis.__filename === "undefined") {
          globalThis.__filename = new URL(import.meta.url).pathname;
        }
var APP_DIR = ".opentrader";
var appPath = join(homedir(), APP_DIR);
var logPath = join(appPath, "log.log");
var settingsPath = join(appPath, "settings.json");
var defaultSettings = {
  /**
   * Daemon hostname. Use `0.0.0.0` to listen on all interfaces
   */
  host: "localhost",
  /**
   * Daemon port.
   */
  port: 8e3
};
function getSettings() {
  if (existsSync(settingsPath)) {
    try {
      return JSON.parse(readFileSync(settingsPath, "utf-8"));
    } catch (error) {
      logger.warn(error, "Failed to parse settings.json.");
      return defaultSettings;
    }
  } else {
    return saveSettings(defaultSettings);
  }
}
function saveSettings(settings) {
  if (!existsSync(appPath)) {
    logger.info(`Creating app directory: ${appPath}`);
    mkdirSync(appPath);
  }
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  return defaultSettings;
}

export { appPath, defaultSettings, getSettings, logPath, saveSettings };
