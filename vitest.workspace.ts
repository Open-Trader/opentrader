import { defineWorkspace } from "vitest/config";

export default defineWorkspace(["apps/*/vitest.config.ts", "packages/*/vitest.config.ts", "pro/*/vitest.config.ts"]);
