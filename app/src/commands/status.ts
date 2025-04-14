import { Command } from "commander";
import { handle } from "../utils/command.js";
import { status } from "../api/status.js";

export function addStatusCommand(program: Command) {
  program.command("status").action(handle(status));
}
