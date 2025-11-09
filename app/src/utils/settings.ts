import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { logger } from "@opentrader/logger";
import { appPath, settingsPath } from "./app-path.js";

type DaemonSettings = {
  host: string;
  port: number;
};

export const defaultSettings: DaemonSettings = {
  /**
   * Daemon hostname. Use `0.0.0.0` to listen on all interfaces
   */
  host: "localhost",
  /**
   * Daemon port.
   */
  port: 8000,
};

export function getSettings(): DaemonSettings {
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

export function saveSettings(settings: DaemonSettings): DaemonSettings {
  if (!existsSync(appPath)) {
    logger.info(`Creating app directory: ${appPath}`);
    mkdirSync(appPath);
  }

  writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

  return defaultSettings;
}
