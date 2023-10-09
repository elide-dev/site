import path from 'path';
import mdx from "@mdx-js/esbuild"
import postcss from 'postcss'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import';
import postcssNormalize from 'postcss-normalize';
import copyAssets from 'postcss-copy-assets'
import { wasmLoader } from 'esbuild-plugin-wasm'
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'
import { Builder, BuildMode } from "./defs.mjs"
import { generateNonce } from "../../../app/util/nonce";

export const builder = Builder.ESBUILD

export const browserLanguageLevel = "es2020"

export const mode =
  process.env.NODE_ENV === BuildMode.DEVELOPMENT
    ? BuildMode.DEVELOPMENT
    : BuildMode.PRODUCTION;

export const isProd = mode === BuildMode.PRODUCTION

export const aliases = {
  "@site": "./app",
  "@entry": "./entry",
  emitter: "events",
}

export const define = {
  '__asset_nonce__': JSON.stringify(generateNonce()),
}

export const envVars = {
  NODE_ENV: mode,
}

export const styleConfig = {
  nonce: '__asset_nonce__',
  loadPaths: [
    path.resolve(__dirname, "../../../node_modules"),
    path.resolve(__dirname, "../../../node_modules/.pnpm/node_modules"),
  ],
}

const postcssPlugins = [
  tailwind,
  postcssImport,
  autoprefixer,
  postcssPresetEnv({stage: 0}),
  postcssNormalize({}),
];

export const globalOptions = {
  minify: isProd,
  legalComments: 'none',
  mainFields: ["module", "main"],
  publicPath: "/dist",
  treeShaking: true,
  tsconfig: "tsconfig.json",
  resolveExtensions: ['.tsx', '.mts', '.ts', '.js'],
  drop: isProd ? ["debugger", "console"] : [],
  define,
  plugins: [
    // Plugin: WASM
    wasmLoader({
      mode: 'embedded'
    }),

    // Plugin: MDX
    mdx({}),

    // Plugins: Styles
    litCssPlugin(),
    sassPlugin({
      ...styleConfig,
      filter: /\.module\.scss$/,
      transform: postcssModules({
        exportGlobals: true,
      })
    }),
    sassPlugin({
      ...styleConfig,
      filter: /\.scss$/
    }),
    sassPlugin({
      ...styleConfig,
      filter: /\.css$/,
      async transform(source, resolveDir) {
        const {css} = await postcss(postcssPlugins).process(source)
        return css
      }
    }),
    sassPlugin({
      ...styleConfig,
      type: 'lit-css',
      filter: /\.element\.scss$/,
      transform: postcssModules({
        exportGlobals: true,
      })
    }),
  ],
}

export const clientOptionDefaults = {
  bundle: false,
  splitting: true,
  target: [browserLanguageLevel],
}

export const serverOptionDefaults = {
  bundle: true,
  alias: aliases,
}
