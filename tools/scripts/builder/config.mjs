import mdx from "@mdx-js/esbuild";
import { Builder, BuildMode } from "./defs.mjs";

export const builder = Builder.ESBUILD;

export const mode =
  process.env.NODE_ENV === BuildMode.DEVELOPMENT
    ? BuildMode.DEVELOPMENT
    : BuildMode.PRODUCTION;

export const isProd = mode === BuildMode.PRODUCTION;

export const aliases = {
  "@site": "./app",
  "@entry": "./entry",
  emitter: "events",
};

export const define = {};

export const envVars = {
  NODE_ENV: mode,
};

export const globalOptions = {
  minify: isProd,
  mainFields: ["module", "main"],
  publicPath: "/dist",
  treeShaking: true,
  tsconfig: "tsconfig.json",
  drop: isProd ? ["debugger", "console"] : [],
  define,
  plugins: [mdx({})],
};

export const clientOptionDefaults = {
  bundle: false,
  target: ["es2020"],
};

export const serverOptionDefaults = {
  bundle: true,
  alias: aliases,
};
