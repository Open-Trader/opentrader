import { logger } from "@opentrader/logger";
import { CommandResult } from "../types.js";
import { getPid, clearPid } from "../utils/pid.js";

type Options = {
  force: boolean;
};

export async function down(options: Options): Promise<CommandResult> {
  const pid = getPid();

  if (!pid) {
    logger.warn("OpenTrader already stopped.");
    return {
      result: undefined,
    };
  }

  try {
    if (options.force) {
      process.kill(pid, "SIGKILL");
      logger.info(`OpenTrader has been forcefully stopped [PID: ${[pid]}]`);
    } else {
      process.kill(pid, "SIGTERM");
      logger.warn(`OpenTrader has been gracefully stopped [PID: ${[pid]}]`);
    }
  } catch (err) {
    logger.warn(`Failed to stop OpenTrader process [PID: ${pid}]. Retry with: opentrader down --force`);
    logger.error(err);
  }

  clearPid();

  return {
    result: undefined,
  };
}
