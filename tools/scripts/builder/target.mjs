import { build, context } from 'esbuild'
import { BuildType, BuildMode, Builder } from './defs.mjs'

export {
    BuildType,
    Builder,
    BuildMode,
}

import {
    define,
    envVars,
    globalOptions,
    clientOptionDefaults,
    serverOptionDefaults
} from './config.mjs'

for (const k in envVars) {
  define[`process.env.${k}`] = JSON.stringify(envVars[k])
}

function targetOptions(opts = {}, base = {}) {
    return {
        ...globalOptions,
        ...base,
        ...opts,
    }
}

export function clientOptions(opts = {}, defaults = clientOptionDefaults) {
    return targetOptions(opts, defaults)
}

export function serverOptions(opts = {}, defaults = serverOptionDefaults) {
    return targetOptions(opts, defaults)
}

export default class BuildTarget {
    constructor(name, type, options = {}) {
        this.name = name
        this.type = type
        this.options = options
    }

    getOptions() {
        return this.options
    }

    getName() {
        return this.name
    }

    toString() {
        return `Target(${this.name}, type = ${this.type})`
    }

    async build() {
        return build(this.options)
    }

    async buildContext() {
        return context(this.options)
    }

    async watch() {
        return (await this.buildContext()).watch()
    }

    async invoke(accept, reject) {
        console.log(`Building target '${this.name}'`)
        this.build().then(accept, reject)
    }
}
