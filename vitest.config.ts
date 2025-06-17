import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["app/*/vitest.config.ts", "packages/*/vitest.config.ts", "pro/*/vitest.config.ts"],
  },
});
