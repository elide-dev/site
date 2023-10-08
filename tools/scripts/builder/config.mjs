import { Builder, BuildMode } from "./defs.mjs";

export const builder = Builder.ESBUILD;

export const mode =
  process.env.NODE_ENV === BuildMode.DEVELOPMENT
    ? BuildMode.DEVELOPMENT
    : BuildMode.PRODUCTION;

export const aliases = {
  "@site": "./app",
  "@entry": "./entry",
  "emitter": "events",
};

export const define = {};

export const envVars = {
  NODE_ENV: mode,
};

export const globalOptions = {
  minify: mode === BuildMode.PRODUCTION,
  mainFields: ["module", "main"],
  publicPath: "/dist",
  define,
};

export const clientOptionDefaults = {
  bundle: false,
};

export const serverOptionDefaults = {
  bundle: true,
  alias: aliases,
};
