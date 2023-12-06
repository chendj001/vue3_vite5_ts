import type { PluginOption } from 'vite'
import { createMarkdown } from './createMarkdown'
import type { MarkdownOptions } from './createMarkdown'
import script from './script'
const vitePluginMd = (opts?: MarkdownOptions): PluginOption => {
  const md = createMarkdown(opts)
  return {
    name: 'vite-plugin-md',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const env: any = {}
        const html = md?.render(code, env)
        const { sfcBlocks } = env
        sfcBlocks.scripts.push(script.md)
        let list= [
          sfcBlocks?.scriptSetup ? sfcBlocks?.scriptSetup?.content : '',
          `<template><div :class="__cls" class="theme-default-content">${html}</div></template>
          `,
          // ...(sfcBlocks?.scripts.map((item: any) => item.content) ?? []),
          // ...(sfcBlocks?.styles.map((item: any) => item.content) ?? []),
          // ...(sfcBlocks?.customBlocks?.map((item: any) => item.content) ?? [])
        ].join('\n')
        console.log(list);
        return list;
      }
    }
  }
}

export { vitePluginMd }

export default vitePluginMd
