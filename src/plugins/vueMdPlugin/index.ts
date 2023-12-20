import type { PluginOption } from 'vite'
import { createMarkdown } from './createMarkdown'
import type { MarkdownOptions } from './createMarkdown'
import { fileURLToPath, URL } from 'node:url'
import script from './script'
const vitePluginMd = (opts?: MarkdownOptions): PluginOption => {
  const md = createMarkdown(opts)
  return {
    name: 'vite-plugin-md',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.md')) {
        if (opts?.importCode) {
          code = opts.importCode(code)
        }
        const env: any = {}
        const html = md?.render(code, env)
        const { sfcBlocks } = env
        sfcBlocks.scripts.push(script.md(id))
        let list = [
          sfcBlocks?.scriptSetup ? sfcBlocks?.scriptSetup?.content : '',
          `<template><div :class="__cls" class="theme-default-content">${html}</div></template>
          `,
          ...(sfcBlocks?.scripts.map((item: any) => item.content) ?? []),
          ...(sfcBlocks?.styles.map((item: any) => item.content) ?? []),
          ...(sfcBlocks?.customBlocks?.map((item: any) => item.content) ?? [])
        ].join('\n')
        return list
      }
    }
  }
}

export { vitePluginMd }

export default vitePluginMd
