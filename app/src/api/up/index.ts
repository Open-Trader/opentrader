import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { logger } from "@opentrader/logger";
import type { CommandResult } from "../../types.js";
import { getPid, savePid } from "../../utils/pid.js";
import { saveSettings } from "../../utils/settings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDevelopment = process.env.NODE_ENV !== "production";

function getAbsoluteStrategiesPath(strategiesPath: string) {
  const isAbsoluePath = strategiesPath.startsWith("/");

  return isAbsoluePath ? strategiesPath : join(process.cwd(), strategiesPath);
}

type Options = {
  detach: boolean;
  port: number;
  host: string;
};

export async function up(options: Options): Promise<CommandResult> {
  const pid = getPid();

  if (pid) {
    logger.warn(`OpenTrader already running [PID: ${pid}]`);

    return {
      result: undefined,
    };
  }

  // Save settings before starting the daemon
  saveSettings({ host: options.host, port: options.port });

  const daemonProcess = isDevelopment
    ? spawn("ts-node", [join(__dirname, "daemon.ts")], {
        detached: options.detach,
        stdio: options.detach ? "ignore" : undefined,
      })
    : spawn("node", [join(__dirname, "daemon.mjs")], {
        detached: options.detach,
        stdio: options.detach ? "ignore" : undefined,
      });

  if (daemonProcess.pid === undefined) {
    throw new Error("OpenTrader process not started. PID is undefined.");
  }

  logger.debug(`OpenTrader daemon started with PID: ${daemonProcess.pid}`);

  if (options.detach) {
    daemonProcess.unref();
    savePid(daemonProcess.pid);
    logger.info(`OpenTrader started as a daemon [PID: ${daemonProcess.pid}]`);
  } else {
    daemonProcess.stdout?.pipe(process.stdout);
    daemonProcess.stderr?.pipe(process.stderr);
  }

  return {
    result: undefined,
  };
}
