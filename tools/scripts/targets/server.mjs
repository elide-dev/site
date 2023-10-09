import BuildTarget, { BuildType, serverOptions } from "../builder/target.mjs";

const express = serverOptions({
  platform: "node",
  outfile: "dist/server.express.mjs",
  entryPoints: ["server/express.tsx"],
  format: "esm",
  banner:{
    js: `
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    `
  },
});

const elide = serverOptions({
  platform: "neutral",
  outfile: "dist/server.elide.mjs",
  entryPoints: [`server/elide.mjs`],
  format: "esm",
});

const worker = serverOptions({
  bundle: true,
  platform: "neutral",
  outfile: "dist/server.workers.mjs",
  entryPoints: [`server/workers.mjs`],
  format: "esm",
  external: ["__STATIC_CONTENT_MANIFEST"],
  inject: [
    "tools/patch/base64.mjs",
    "tools/patch/ieee754.mjs",
    "tools/patch/buffer.mjs",
    "tools/patch/process.mjs",
  ],
});

// Exports.
export const allTargets = [
  new BuildTarget("express", BuildType.SERVER, express),
  new BuildTarget("elide", BuildType.SERVER, elide),
  new BuildTarget("worker", BuildType.SERVER, worker),
];
