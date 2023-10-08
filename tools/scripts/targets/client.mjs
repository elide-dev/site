import BuildTarget, { BuildType, clientOptions } from "../builder/target.mjs"

export const clientJs = {
    platform: 'browser',
    entryPoints: ["entry/client.tsx"],
    format: "esm",
    splitting: false,
    bundle: true,
    outdir: 'dist',
}

export const esmClient = new BuildTarget(
    'client',
    BuildType.CLIENT,
    clientOptions(clientJs),
)

// Exports.
export const allTargets = [
    esmClient,
];
