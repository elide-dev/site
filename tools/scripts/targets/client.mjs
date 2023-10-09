import BuildTarget, { BuildType, clientOptions } from "../builder/target.mjs";

export const clientJs = {
  platform: "browser",
  format: "esm",
  bundle: true,
  outdir: "dist",
  entryPoints: [
    "entry/client.tsx",
    "app/styles/common.css",
  ],
};

export const esmClient = new BuildTarget(
  "client",
  BuildType.CLIENT,
  clientOptions(clientJs),
);

// Exports.
export const allTargets = [esmClient];
