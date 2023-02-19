import { execSync } from 'child_process'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

import type { Plugin } from 'rollup'

export default function myPlugin(fileName: string): Plugin {
    fileName = resolve(fileName)
    return {
        name: "json-cmd",
        async load(id) {
            if (id === fileName) {
                const content = await readFile(id)
                const obj: Record<string, string> = JSON.parse(content.toString())
                for (const k in obj) {
                    const cmd = obj[k]
                    console.log(`exec: ${cmd}`)
                    const res = execSync(cmd)
                    console.log(`result:${res}`)
                    obj[k] = res.toString()
                }
                return JSON.stringify(obj)
            }
        }
    }
}