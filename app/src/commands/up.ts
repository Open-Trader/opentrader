import { Command, Option } from "commander";
import { handle } from "../utils/command.js";
import { up } from "../api/up/index.js";
import { defaultSettings } from "../utils/settings.js";

export function addUpCommand(program: Command) {
  program
    .command("up")
    .addOption(new Option("-d, --detach", "Run in detached mode").default(false))
    .addOption(new Option("--host <host>", "Custom daemon host. Default to `localhost`").default(defaultSettings.host))
    .addOption(new Option("-p, --port <port>", "Custom daemon port. Default to `8000`").default(defaultSettings.port))
    .action(handle(up));
}
