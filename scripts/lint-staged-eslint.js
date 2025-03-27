#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const gitRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const files = process.argv.slice(2);
if (files.length === 0) process.exit(0);

const filesByPackage = {};
files.forEach((file) => {
  const parts = file.split("/");
  if (!["apps", "packages", "pro"].includes(parts[0])) return;

  const packageKey = `${parts[0]}/${parts[1]}`;
  filesByPackage[packageKey] = filesByPackage[packageKey] || [];
  filesByPackage[packageKey].push(file);
});

Object.entries(filesByPackage).forEach(([packageDir, packageFiles]) => {
  const eslintConfigPath = path.join(gitRoot, packageDir, "eslint.config.js");

  if (fs.existsSync(eslintConfigPath)) {
    try {
      const command = `npx eslint --fix --config ${eslintConfigPath} ${packageFiles.join(" ")}`;
      execSync(command, { stdio: "inherit" });
    } catch (error) {
      process.exit(1);
    }
  }
});
