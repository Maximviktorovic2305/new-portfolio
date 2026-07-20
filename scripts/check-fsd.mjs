import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = join(projectRoot, "src");
const sourceExtensions = new Set([".ts", ".tsx"]);
const layerRank = new Map([
  ["shared", 0],
  ["entities", 1],
  ["features", 2],
  ["widgets", 3],
  ["pages", 4],
  ["app", 5],
]);
const slicedLayers = new Set(["entities", "features", "widgets", "pages"]);
const importPattern = /(?:from\s+|import\s*\()\s*["'](@\/[^"']+)["']/g;

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return collectSourceFiles(path);
      return sourceExtensions.has(extname(entry.name)) ? [path] : [];
    }),
  );

  return files.flat();
}

function toPosix(path) {
  return path.split(sep).join("/");
}

function parseTarget(specifier) {
  const [layer, slice, ...internal] = specifier.slice(2).split("/");
  return { layer, slice, internal };
}

const violations = [];
const files = await collectSourceFiles(sourceRoot);

for (const file of files) {
  const sourcePath = toPosix(relative(sourceRoot, file));
  const [sourceLayer, sourceSlice] = sourcePath.split("/");
  const sourceRank = layerRank.get(sourceLayer);
  if (sourceRank === undefined) continue;

  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(importPattern)) {
    const specifier = match[1];
    if (!specifier) continue;

    const target = parseTarget(specifier);
    const targetRank = layerRank.get(target.layer);
    if (targetRank === undefined) continue;

    if (targetRank > sourceRank) {
      violations.push(`${sourcePath}: ${sourceLayer} cannot import higher layer ${specifier}`);
    }

    if (slicedLayers.has(sourceLayer) && sourceLayer === target.layer && sourceSlice !== target.slice) {
      violations.push(`${sourcePath}: cross-slice import is forbidden: ${specifier}`);
    }

    if (slicedLayers.has(target.layer) && target.internal.length > 0) {
      const importsOwnSlice = sourceLayer === target.layer && sourceSlice === target.slice;
      if (!importsOwnSlice) {
        violations.push(`${sourcePath}: import ${specifier} through @/${target.layer}/${target.slice}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`FSD boundary violations (${violations.length}):`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(`FSD boundaries OK (${files.length} TypeScript files checked).`);
}
