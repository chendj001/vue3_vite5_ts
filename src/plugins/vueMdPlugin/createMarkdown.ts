import { slugify as defaultSlugify } from '@mdit-vue/shared'
import type {
  Markdown,
  MarkdownOptions as MarkdownBaseOptions
} from '@vuepress/markdown'
//@ts-ignore
import MarkdownIt from 'markdown-it'
import {
  anchorPlugin,
  assetsPlugin,
  codePlugin,
  componentPlugin,
  emojiPlugin,
  frontmatterPlugin,
  headersPlugin,
  importCodePlugin,
  linksPlugin,
  sfcPlugin,
  titlePlugin,
  tocPlugin
} from '@vuepress/markdown'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  CodePluginOptions,
  EmojiPluginOptions,
  FrontmatterPluginOptions,
  HeadersPluginOptions,
  ImportCodePluginOptions,
  LinksPluginOptions,
  SfcPluginOptions,
  TocPluginOptions
} from '@vuepress/markdown'

import MarkdownItShiki from 'markdown-it-shiki'
import type { Options as shiki } from 'markdown-it-shiki'
import markdownItcontainer from '@vuepress/plugin-container'
import { containerOptions } from './container'
export interface MarkdownOptions extends MarkdownBaseOptions {
  shiki?: false | shiki
}
export const createMarkdown = ({
  anchor,
  assets,
  code,
  component,
  emoji,
  frontmatter,
  headers,
  title,
  importCode,
  links,
  sfc,
  slugify = defaultSlugify,
  toc,
  shiki,
  ...markdownItOptions
}: MarkdownOptions = {}): Markdown => {
  const md = MarkdownIt({
    ...markdownItOptions,
    html: true
  })
  containerOptions.map((item) => {
    let containerTip: any = markdownItcontainer(item)
    md.use(containerTip.extendsMarkdown)
  })
  md.use<AnchorPluginOptions>(anchorPlugin, {
    level: [1, 2, 3, 4, 5, 6],
    slugify,
    permalink: anchorPlugin.permalink.ariaHidden({
      class: 'header-anchor',
      symbol: '#',
      space: true,
      placement: 'before'
    }),
    ...anchor
  })
  md.use<AssetsPluginOptions>(assetsPlugin, assets as any)
  md.use<CodePluginOptions>(codePlugin, code as any)
  md.use(componentPlugin)
  md.use<EmojiPluginOptions>(emojiPlugin, emoji as any)

  md.use<FrontmatterPluginOptions>(frontmatterPlugin, {
    ...frontmatter,
    grayMatterOptions: {
      excerpt: false,
      //@ts-ignore
      ...frontmatter?.grayMatterOptions
    }
  })
  md.use<HeadersPluginOptions>(headersPlugin, {
    level: [2, 3],
    slugify,
    ...headers
  })
  md.use<ImportCodePluginOptions>(importCodePlugin, importCode as any)
  md.use<LinksPluginOptions>(linksPlugin, links as any)
  md.use<SfcPluginOptions>(sfcPlugin, sfc as any)
  md.use<TocPluginOptions>(tocPlugin, {
    level: [2, 3],
    slugify,
    linkTag: 'router-link',
    ...toc
  })
  md.use(titlePlugin)
  md.use<shiki>(MarkdownItShiki, shiki as any)
  return md
}
