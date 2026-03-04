import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3015);
const distDir = resolve(process.cwd(), "dist");
const indexPath = join(distDir, "index.html");

const mimeByExt = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(res, filePath) {
  const ext = extname(filePath).toLowerCase();
  const type = mimeByExt[ext] || "application/octet-stream";

  let size;
  try {
    size = statSync(filePath).size;
  } catch {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", type);
  res.setHeader("Content-Length", size);
  res.setHeader("Cache-Control", ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable");
  createReadStream(filePath).pipe(res);
}

if (!existsSync(indexPath)) {
  console.error("Build output not found.");
  console.error("Run `npm run build` first to generate the dist folder.");
  process.exit(1);
}

const server = createServer((req, res) => {
  const reqUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const decodedPath = decodeURIComponent(reqUrl.pathname);
  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^\/+/, "");
  const normalizedPath = normalize(relativePath);
  const candidatePath = resolve(distDir, normalizedPath);

  if (!candidatePath.startsWith(distDir)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  if (existsSync(candidatePath) && statSync(candidatePath).isFile()) {
    sendFile(res, candidatePath);
    return;
  }

  // SPA fallback: let React Router handle unknown paths.
  sendFile(res, indexPath);
});

server.listen(port, host, () => {
  console.log(`Serving dist on http://${host}:${port}`);
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);
    console.error("Set another port with PORT.");
    console.error("PowerShell: $env:PORT=4173; npm run start");
    console.error("Bash: PORT=4173 npm run start");
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
