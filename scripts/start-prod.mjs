import { existsSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const port = (process.env.PORT || "3015").trim();
const host = (process.env.HOST || "0.0.0.0").trim();
const listenEndpoint = `tcp://${host}:${port}`;
const serveEntrypoint = path.join(process.cwd(), "node_modules", "serve", "build", "main.js");
const isDryRun = process.argv.includes("--dry-run");

if (!existsSync(serveEntrypoint)) {
  console.error("serve is not installed. Run: npm install");
  process.exit(1);
}

if (isDryRun) {
  console.log(`[start-prod] node ${serveEntrypoint} -s dist -l ${listenEndpoint}`);
  process.exit(0);
}

const child = spawn(
  process.execPath,
  [serveEntrypoint, "-s", "dist", "-l", listenEndpoint],
  { stdio: "inherit", env: process.env },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

