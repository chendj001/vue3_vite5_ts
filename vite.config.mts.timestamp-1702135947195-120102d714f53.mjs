// vite.config.mts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/github/vue3_vite5_ts/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/github/vue3_vite5_ts/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/github/vue3_vite5_ts/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { VitePWA } from "file:///E:/github/vue3_vite5_ts/node_modules/vite-plugin-pwa/dist/index.js";
import ViteComponents from "file:///E:/github/vue3_vite5_ts/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///E:/github/vue3_vite5_ts/node_modules/unplugin-auto-import/dist/vite.js";
import vueSetupExtend from "file:///E:/github/vue3_vite5_ts/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";

// src/plugins/vueMdPlugin/createMarkdown.ts
import { slugify as defaultSlugify } from "file:///E:/github/vue3_vite5_ts/node_modules/@mdit-vue/shared/dist/index.mjs";
import MarkdownIt from "file:///E:/github/vue3_vite5_ts/node_modules/markdown-it/index.js";
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
} from "file:///E:/github/vue3_vite5_ts/node_modules/@vuepress/markdown/dist/index.js";
import MarkdownItShiki from "file:///E:/github/vue3_vite5_ts/node_modules/markdown-it-shiki/dist/index.mjs";
import markdownItcontainer from "file:///E:/github/vue3_vite5_ts/node_modules/@vuepress/plugin-container/lib/node/index.js";

// src/plugins/vueMdPlugin/container.ts
var containerOptions = [
  {
    type: "tip",
    locales: {
      "/": {
        defaultInfo: "\u63D0\u793A"
      },
      "/zh/": {
        defaultInfo: "\u63D0\u793A"
      }
    }
  },
  {
    type: "warning",
    locales: {
      "/": {
        defaultInfo: "\u8B66\u544A"
      },
      "/zh/": {
        defaultInfo: "\u8B66\u544A"
      }
    }
  },
  {
    type: "danger",
    locales: {
      "/": {
        defaultInfo: "\u5371\u9669"
      },
      "/zh/": {
        defaultInfo: "\u5371\u9669"
      }
    }
  },
  {
    type: "details",
    before: (info) => `<details class="custom-container details">${info ? `<summary>${info}</summary>` : ""}
`,
    after: () => "</details>\n"
  },
  {
    type: "code-group",
    before: () => `<CodeGroup>
`,
    after: () => "</CodeGroup>\n"
  },
  {
    type: "code-group-item",
    before: (info) => `<CodeGroupItem title="${info}">
`,
    after: () => "</CodeGroupItem>\n"
  }
];

// src/plugins/vueMdPlugin/createMarkdown.ts
var createMarkdown = ({
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
} = {}) => {
  const md = MarkdownIt({
    ...markdownItOptions,
    html: true
  });
  containerOptions.map((item) => {
    let containerTip = markdownItcontainer(item);
    md.use(containerTip.extendsMarkdown);
  });
  md.use(anchorPlugin, {
    level: [1, 2, 3, 4, 5, 6],
    slugify,
    permalink: anchorPlugin.permalink.ariaHidden({
      class: "header-anchor",
      symbol: "#",
      space: true,
      placement: "before"
    }),
    ...anchor
  });
  md.use(assetsPlugin, assets);
  md.use(codePlugin, code);
  md.use(componentPlugin);
  md.use(emojiPlugin, emoji);
  md.use(frontmatterPlugin, {
    ...frontmatter,
    grayMatterOptions: {
      excerpt: false,
      //@ts-ignore
      ...frontmatter?.grayMatterOptions
    }
  });
  md.use(headersPlugin, {
    level: [2, 3],
    slugify,
    ...headers
  });
  md.use(importCodePlugin, importCode);
  md.use(linksPlugin, links);
  md.use(sfcPlugin, sfc);
  md.use(tocPlugin, {
    level: [2, 3],
    slugify,
    linkTag: "router-link",
    ...toc
  });
  md.use(titlePlugin);
  md.use(MarkdownItShiki, shiki);
  return md;
};

// src/plugins/vueMdPlugin/script.ts
var createScript = (id) => {
  let md = `<script>
  export default {
    data() {
      return {
        __cls: ''
      }
    },
    mounted() {
      const meta = this.$route.meta
      if(meta){
        this.__cls = meta.cls||''
      }
    }
  }
</script>`;
  return {
    content: md,
    tagOpen: "<script>",
    type: "script",
    contentStripped: `export default ${md}`,
    tagClose: "</script>"
  };
};
var script_default = {
  md: (id) => createScript(id)
};

// src/plugins/vueMdPlugin/index.ts
var vitePluginMd = (opts) => {
  const md = createMarkdown(opts);
  return {
    name: "vite-plugin-md",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith(".md")) {
        const env = {};
        const html = md?.render(code, env);
        const { sfcBlocks } = env;
        sfcBlocks.scripts.push(script_default.md(id));
        let list = [
          sfcBlocks?.scriptSetup ? sfcBlocks?.scriptSetup?.content : "",
          `<template><div :class="__cls" class="theme-default-content">${html}</div></template>
          `,
          ...sfcBlocks?.scripts.map((item) => item.content) ?? [],
          ...sfcBlocks?.styles.map((item) => item.content) ?? [],
          ...sfcBlocks?.customBlocks?.map((item) => item.content) ?? []
        ].join("\n");
        return list;
      }
    }
  };
};
var vueMdPlugin_default = vitePluginMd;

// vite.config.mts
var __vite_injected_original_import_meta_url = "file:///E:/github/vue3_vite5_ts/vite.config.mts";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV == "development" ? "/" : "/vue3_vite5_ts/",
  plugins: [
    vueMdPlugin_default({
      shiki: {
        theme: "dark-plus"
      }
    }),
    vue({
      include: [/(\.vue)$/, /\.md$/],
      script: {
        propsDestructure: true
      }
    }),
    vueJsx(),
    vueSetupExtend(),
    ViteComponents({
      dts: true,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      // 路径写全
      dirs: ["./src/components", "./src/hooks"],
      // 哪些文件类型应该被视为组件
      extensions: ["vue", "tsx"]
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ["vue", "vue-router"],
      defaultExportByFilename: true,
      // 路径写全
      dirs: ["./src/components/**", "./src/hooks/**"],
      dts: "./auto-imports.d.ts",
      vueTemplate: false,
      resolvers: [],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      includeAssets: ["logo.svg"],
      manifest: {
        name: "\u53CC\u5203\u6218\u610F",
        short_name: "\u53CC\u5203\u6218\u610F",
        description: "\u53CC\u5203\u6218\u610F \u63CF\u8FF0",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo.svg",
            sizes: "192x192",
            type: "image/svg+xml"
          },
          {
            src: "logo.svg",
            sizes: "512x512",
            type: "image/svg+xml"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/scss/mixin/var.module.scss" as *;
        @use "@/scss/mixin/index.scss" as *;
        `
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInNyYy9wbHVnaW5zL3Z1ZU1kUGx1Z2luL2NyZWF0ZU1hcmtkb3duLnRzIiwgInNyYy9wbHVnaW5zL3Z1ZU1kUGx1Z2luL2NvbnRhaW5lci50cyIsICJzcmMvcGx1Z2lucy92dWVNZFBsdWdpbi9zY3JpcHQudHMiLCAic3JjL3BsdWdpbnMvdnVlTWRQbHVnaW4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcdnVlM192aXRlNV90c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXHZ1ZTNfdml0ZTVfdHNcXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9naXRodWIvdnVlM192aXRlNV90cy92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbi8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNi1zZmNcclxuaW1wb3J0IFZpdGVDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbi8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NUYxNVx1NzUyOFxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG4vLyBcdTdFQzRcdTRFRjZcdTU0N0RcdTU0MERcclxuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnXHJcbi8vIFx1NkUzMlx1NjdEM21hcmtkb3duXHJcbmltcG9ydCB2dWVNZCBmcm9tICcuL3NyYy9wbHVnaW5zL3Z1ZU1kUGx1Z2luJ1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09ICdkZXZlbG9wbWVudCcgPyAnLycgOiAnL3Z1ZTNfdml0ZTVfdHMvJyxcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWVNZCh7XHJcbiAgICAgIHNoaWtpOiB7XHJcbiAgICAgICAgdGhlbWU6ICdkYXJrLXBsdXMnXHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgdnVlKHtcclxuICAgICAgaW5jbHVkZTogWy8oXFwudnVlKSQvLCAvXFwubWQkL10sXHJcbiAgICAgIHNjcmlwdDoge1xyXG4gICAgICAgIHByb3BzRGVzdHJ1Y3R1cmU6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICBWaXRlQ29tcG9uZW50cyh7XHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogWy9cXC5bdGpdc3g/JC8sIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS9dLFxyXG4gICAgICAvLyBcdThERUZcdTVGODRcdTUxOTlcdTUxNjhcclxuICAgICAgZGlyczogWycuL3NyYy9jb21wb25lbnRzJywgJy4vc3JjL2hvb2tzJ10sXHJcbiAgICAgIC8vIFx1NTRFQVx1NEU5Qlx1NjU4N1x1NEVGNlx1N0M3Qlx1NTc4Qlx1NUU5NFx1OEJFNVx1ODhBQlx1ODlDNlx1NEUzQVx1N0VDNFx1NEVGNlxyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICd0c3gnXVxyXG4gICAgfSksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW5jbHVkZTogWy9cXC5bdGpdc3g/JC8sIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlciddLFxyXG4gICAgICBkZWZhdWx0RXhwb3J0QnlGaWxlbmFtZTogdHJ1ZSxcclxuICAgICAgLy8gXHU4REVGXHU1Rjg0XHU1MTk5XHU1MTY4XHJcbiAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cy8qKicsICcuL3NyYy9ob29rcy8qKiddLFxyXG4gICAgICBkdHM6ICcuL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgdnVlVGVtcGxhdGU6IGZhbHNlLFxyXG4gICAgICByZXNvbHZlcnM6IFtdLFxyXG4gICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcclxuICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLCBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2xvZ28uc3ZnJ10sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogJ1x1NTNDQ1x1NTIwM1x1NjIxOFx1NjEwRicsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ1x1NTNDQ1x1NTIwM1x1NjIxOFx1NjEwRicsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdcdTUzQ0NcdTUyMDNcdTYyMThcdTYxMEYgXHU2M0NGXHU4RkYwJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ2xvZ28uc3ZnJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3N2Zyt4bWwnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdsb2dvLnN2ZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9zdmcreG1sJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgQHVzZSBcIkAvc2Nzcy9taXhpbi92YXIubW9kdWxlLnNjc3NcIiBhcyAqO1xyXG4gICAgICAgIEB1c2UgXCJAL3Njc3MvbWl4aW4vaW5kZXguc2Nzc1wiIGFzICo7XHJcbiAgICAgICAgYFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXHZ1ZTNfdml0ZTVfdHNcXFxcc3JjXFxcXHBsdWdpbnNcXFxcdnVlTWRQbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGdpdGh1YlxcXFx2dWUzX3ZpdGU1X3RzXFxcXHNyY1xcXFxwbHVnaW5zXFxcXHZ1ZU1kUGx1Z2luXFxcXGNyZWF0ZU1hcmtkb3duLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9naXRodWIvdnVlM192aXRlNV90cy9zcmMvcGx1Z2lucy92dWVNZFBsdWdpbi9jcmVhdGVNYXJrZG93bi50c1wiO2ltcG9ydCB7IHNsdWdpZnkgYXMgZGVmYXVsdFNsdWdpZnkgfSBmcm9tICdAbWRpdC12dWUvc2hhcmVkJ1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgTWFya2Rvd24sXHJcbiAgTWFya2Rvd25PcHRpb25zIGFzIE1hcmtkb3duQmFzZU9wdGlvbnNcclxufSBmcm9tICdAdnVlcHJlc3MvbWFya2Rvd24nXHJcbi8vQHRzLWlnbm9yZVxyXG5pbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcclxuaW1wb3J0IHtcclxuICBhbmNob3JQbHVnaW4sXHJcbiAgYXNzZXRzUGx1Z2luLFxyXG4gIGNvZGVQbHVnaW4sXHJcbiAgY29tcG9uZW50UGx1Z2luLFxyXG4gIGVtb2ppUGx1Z2luLFxyXG4gIGZyb250bWF0dGVyUGx1Z2luLFxyXG4gIGhlYWRlcnNQbHVnaW4sXHJcbiAgaW1wb3J0Q29kZVBsdWdpbixcclxuICBsaW5rc1BsdWdpbixcclxuICBzZmNQbHVnaW4sXHJcbiAgdGl0bGVQbHVnaW4sXHJcbiAgdG9jUGx1Z2luXHJcbn0gZnJvbSAnQHZ1ZXByZXNzL21hcmtkb3duJ1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgQW5jaG9yUGx1Z2luT3B0aW9ucyxcclxuICBBc3NldHNQbHVnaW5PcHRpb25zLFxyXG4gIENvZGVQbHVnaW5PcHRpb25zLFxyXG4gIEVtb2ppUGx1Z2luT3B0aW9ucyxcclxuICBGcm9udG1hdHRlclBsdWdpbk9wdGlvbnMsXHJcbiAgSGVhZGVyc1BsdWdpbk9wdGlvbnMsXHJcbiAgSW1wb3J0Q29kZVBsdWdpbk9wdGlvbnMsXHJcbiAgTGlua3NQbHVnaW5PcHRpb25zLFxyXG4gIFNmY1BsdWdpbk9wdGlvbnMsXHJcbiAgVG9jUGx1Z2luT3B0aW9uc1xyXG59IGZyb20gJ0B2dWVwcmVzcy9tYXJrZG93bidcclxuXHJcbmltcG9ydCBNYXJrZG93bkl0U2hpa2kgZnJvbSAnbWFya2Rvd24taXQtc2hpa2knXHJcbmltcG9ydCB0eXBlIHsgT3B0aW9ucyBhcyBzaGlraSB9IGZyb20gJ21hcmtkb3duLWl0LXNoaWtpJ1xyXG5pbXBvcnQgbWFya2Rvd25JdGNvbnRhaW5lciBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWNvbnRhaW5lcidcclxuaW1wb3J0IHsgY29udGFpbmVyT3B0aW9ucyB9IGZyb20gJy4vY29udGFpbmVyJ1xyXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duT3B0aW9ucyBleHRlbmRzIE1hcmtkb3duQmFzZU9wdGlvbnMge1xyXG4gIHNoaWtpPzogZmFsc2UgfCBzaGlraVxyXG59XHJcbmV4cG9ydCBjb25zdCBjcmVhdGVNYXJrZG93biA9ICh7XHJcbiAgYW5jaG9yLFxyXG4gIGFzc2V0cyxcclxuICBjb2RlLFxyXG4gIGNvbXBvbmVudCxcclxuICBlbW9qaSxcclxuICBmcm9udG1hdHRlcixcclxuICBoZWFkZXJzLFxyXG4gIHRpdGxlLFxyXG4gIGltcG9ydENvZGUsXHJcbiAgbGlua3MsXHJcbiAgc2ZjLFxyXG4gIHNsdWdpZnkgPSBkZWZhdWx0U2x1Z2lmeSxcclxuICB0b2MsXHJcbiAgc2hpa2ksXHJcbiAgLi4ubWFya2Rvd25JdE9wdGlvbnNcclxufTogTWFya2Rvd25PcHRpb25zID0ge30pOiBNYXJrZG93biA9PiB7XHJcbiAgY29uc3QgbWQgPSBNYXJrZG93bkl0KHtcclxuICAgIC4uLm1hcmtkb3duSXRPcHRpb25zLFxyXG4gICAgaHRtbDogdHJ1ZVxyXG4gIH0pXHJcbiAgY29udGFpbmVyT3B0aW9ucy5tYXAoKGl0ZW0pID0+IHtcclxuICAgIGxldCBjb250YWluZXJUaXA6IGFueSA9IG1hcmtkb3duSXRjb250YWluZXIoaXRlbSlcclxuICAgIG1kLnVzZShjb250YWluZXJUaXAuZXh0ZW5kc01hcmtkb3duKVxyXG4gIH0pXHJcbiAgbWQudXNlPEFuY2hvclBsdWdpbk9wdGlvbnM+KGFuY2hvclBsdWdpbiwge1xyXG4gICAgbGV2ZWw6IFsxLCAyLCAzLCA0LCA1LCA2XSxcclxuICAgIHNsdWdpZnksXHJcbiAgICBwZXJtYWxpbms6IGFuY2hvclBsdWdpbi5wZXJtYWxpbmsuYXJpYUhpZGRlbih7XHJcbiAgICAgIGNsYXNzOiAnaGVhZGVyLWFuY2hvcicsXHJcbiAgICAgIHN5bWJvbDogJyMnLFxyXG4gICAgICBzcGFjZTogdHJ1ZSxcclxuICAgICAgcGxhY2VtZW50OiAnYmVmb3JlJ1xyXG4gICAgfSksXHJcbiAgICAuLi5hbmNob3JcclxuICB9KVxyXG4gIG1kLnVzZTxBc3NldHNQbHVnaW5PcHRpb25zPihhc3NldHNQbHVnaW4sIGFzc2V0cyBhcyBhbnkpXHJcbiAgbWQudXNlPENvZGVQbHVnaW5PcHRpb25zPihjb2RlUGx1Z2luLCBjb2RlIGFzIGFueSlcclxuICBtZC51c2UoY29tcG9uZW50UGx1Z2luKVxyXG4gIG1kLnVzZTxFbW9qaVBsdWdpbk9wdGlvbnM+KGVtb2ppUGx1Z2luLCBlbW9qaSBhcyBhbnkpXHJcblxyXG4gIG1kLnVzZTxGcm9udG1hdHRlclBsdWdpbk9wdGlvbnM+KGZyb250bWF0dGVyUGx1Z2luLCB7XHJcbiAgICAuLi5mcm9udG1hdHRlcixcclxuICAgIGdyYXlNYXR0ZXJPcHRpb25zOiB7XHJcbiAgICAgIGV4Y2VycHQ6IGZhbHNlLFxyXG4gICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgLi4uZnJvbnRtYXR0ZXI/LmdyYXlNYXR0ZXJPcHRpb25zXHJcbiAgICB9XHJcbiAgfSlcclxuICBtZC51c2U8SGVhZGVyc1BsdWdpbk9wdGlvbnM+KGhlYWRlcnNQbHVnaW4sIHtcclxuICAgIGxldmVsOiBbMiwgM10sXHJcbiAgICBzbHVnaWZ5LFxyXG4gICAgLi4uaGVhZGVyc1xyXG4gIH0pXHJcbiAgbWQudXNlPEltcG9ydENvZGVQbHVnaW5PcHRpb25zPihpbXBvcnRDb2RlUGx1Z2luLCBpbXBvcnRDb2RlIGFzIGFueSlcclxuICBtZC51c2U8TGlua3NQbHVnaW5PcHRpb25zPihsaW5rc1BsdWdpbiwgbGlua3MgYXMgYW55KVxyXG4gIG1kLnVzZTxTZmNQbHVnaW5PcHRpb25zPihzZmNQbHVnaW4sIHNmYyBhcyBhbnkpXHJcbiAgbWQudXNlPFRvY1BsdWdpbk9wdGlvbnM+KHRvY1BsdWdpbiwge1xyXG4gICAgbGV2ZWw6IFsyLCAzXSxcclxuICAgIHNsdWdpZnksXHJcbiAgICBsaW5rVGFnOiAncm91dGVyLWxpbmsnLFxyXG4gICAgLi4udG9jXHJcbiAgfSlcclxuICBtZC51c2UodGl0bGVQbHVnaW4pXHJcbiAgbWQudXNlPHNoaWtpPihNYXJrZG93bkl0U2hpa2ksIHNoaWtpIGFzIGFueSlcclxuICByZXR1cm4gbWRcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGdpdGh1YlxcXFx2dWUzX3ZpdGU1X3RzXFxcXHNyY1xcXFxwbHVnaW5zXFxcXHZ1ZU1kUGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcdnVlM192aXRlNV90c1xcXFxzcmNcXFxccGx1Z2luc1xcXFx2dWVNZFBsdWdpblxcXFxjb250YWluZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi92dWUzX3ZpdGU1X3RzL3NyYy9wbHVnaW5zL3Z1ZU1kUGx1Z2luL2NvbnRhaW5lci50c1wiO2NvbnN0IGNvbnRhaW5lck9wdGlvbnMgPSBbXHJcbiAge1xyXG4gICAgdHlwZTogJ3RpcCcsXHJcbiAgICBsb2NhbGVzOiB7XHJcbiAgICAgICcvJzoge1xyXG4gICAgICAgIGRlZmF1bHRJbmZvOiAnXHU2M0QwXHU3OTNBJ1xyXG4gICAgICB9LFxyXG4gICAgICAnL3poLyc6IHtcclxuICAgICAgICBkZWZhdWx0SW5mbzogJ1x1NjNEMFx1NzkzQSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgbG9jYWxlczoge1xyXG4gICAgICAnLyc6IHtcclxuICAgICAgICBkZWZhdWx0SW5mbzogJ1x1OEI2Nlx1NTQ0QSdcclxuICAgICAgfSxcclxuICAgICAgJy96aC8nOiB7XHJcbiAgICAgICAgZGVmYXVsdEluZm86ICdcdThCNjZcdTU0NEEnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHR5cGU6ICdkYW5nZXInLFxyXG4gICAgbG9jYWxlczoge1xyXG4gICAgICAnLyc6IHtcclxuICAgICAgICBkZWZhdWx0SW5mbzogJ1x1NTM3MVx1OTY2OSdcclxuICAgICAgfSxcclxuICAgICAgJy96aC8nOiB7XHJcbiAgICAgICAgZGVmYXVsdEluZm86ICdcdTUzNzFcdTk2NjknXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHR5cGU6ICdkZXRhaWxzJyxcclxuICAgIGJlZm9yZTogKGluZm86IGFueSkgPT5cclxuICAgICAgYDxkZXRhaWxzIGNsYXNzPVwiY3VzdG9tLWNvbnRhaW5lciBkZXRhaWxzXCI+JHtcclxuICAgICAgICBpbmZvID8gYDxzdW1tYXJ5PiR7aW5mb308L3N1bW1hcnk+YCA6ICcnXHJcbiAgICAgIH1cXG5gLFxyXG4gICAgYWZ0ZXI6ICgpID0+ICc8L2RldGFpbHM+XFxuJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdHlwZTogJ2NvZGUtZ3JvdXAnLFxyXG4gICAgYmVmb3JlOiAoKSA9PiBgPENvZGVHcm91cD5cXG5gLFxyXG4gICAgYWZ0ZXI6ICgpID0+ICc8L0NvZGVHcm91cD5cXG4nXHJcbiAgfSxcclxuICB7XHJcbiAgICB0eXBlOiAnY29kZS1ncm91cC1pdGVtJyxcclxuICAgIGJlZm9yZTogKGluZm86IGFueSkgPT4gYDxDb2RlR3JvdXBJdGVtIHRpdGxlPVwiJHtpbmZvfVwiPlxcbmAsXHJcbiAgICBhZnRlcjogKCkgPT4gJzwvQ29kZUdyb3VwSXRlbT5cXG4nXHJcbiAgfVxyXG5dXHJcbmV4cG9ydCB7IGNvbnRhaW5lck9wdGlvbnMgfVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGdpdGh1YlxcXFx2dWUzX3ZpdGU1X3RzXFxcXHNyY1xcXFxwbHVnaW5zXFxcXHZ1ZU1kUGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcdnVlM192aXRlNV90c1xcXFxzcmNcXFxccGx1Z2luc1xcXFx2dWVNZFBsdWdpblxcXFxzY3JpcHQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi92dWUzX3ZpdGU1X3RzL3NyYy9wbHVnaW5zL3Z1ZU1kUGx1Z2luL3NjcmlwdC50c1wiO2Z1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcclxuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXHJcbn1cclxuY29uc3QgY3JlYXRlU2NyaXB0ID0gKGlkOiBzdHJpbmcpID0+IHtcclxuICBsZXQgbWQgPSBgPHNjcmlwdD5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIF9fY2xzOiAnJ1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgY29uc3QgbWV0YSA9IHRoaXMuJHJvdXRlLm1ldGFcclxuICAgICAgaWYobWV0YSl7XHJcbiAgICAgICAgdGhpcy5fX2NscyA9IG1ldGEuY2xzfHwnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5gXHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbnRlbnQ6IG1kLFxyXG4gICAgdGFnT3BlbjogJzxzY3JpcHQ+JyxcclxuICAgIHR5cGU6ICdzY3JpcHQnLFxyXG4gICAgY29udGVudFN0cmlwcGVkOiBgZXhwb3J0IGRlZmF1bHQgJHttZH1gLFxyXG4gICAgdGFnQ2xvc2U6ICc8L3NjcmlwdD4nXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbWQ6IChpZDogc3RyaW5nKSA9PiBjcmVhdGVTY3JpcHQoaWQpXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxcdnVlM192aXRlNV90c1xcXFxzcmNcXFxccGx1Z2luc1xcXFx2dWVNZFBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXHZ1ZTNfdml0ZTVfdHNcXFxcc3JjXFxcXHBsdWdpbnNcXFxcdnVlTWRQbHVnaW5cXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi92dWUzX3ZpdGU1X3RzL3NyYy9wbHVnaW5zL3Z1ZU1kUGx1Z2luL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBjcmVhdGVNYXJrZG93biB9IGZyb20gJy4vY3JlYXRlTWFya2Rvd24nXHJcbmltcG9ydCB0eXBlIHsgTWFya2Rvd25PcHRpb25zIH0gZnJvbSAnLi9jcmVhdGVNYXJrZG93bidcclxuaW1wb3J0IHNjcmlwdCBmcm9tICcuL3NjcmlwdCdcclxuY29uc3Qgdml0ZVBsdWdpbk1kID0gKG9wdHM/OiBNYXJrZG93bk9wdGlvbnMpOiBQbHVnaW5PcHRpb24gPT4ge1xyXG4gIGNvbnN0IG1kID0gY3JlYXRlTWFya2Rvd24ob3B0cylcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGUtcGx1Z2luLW1kJyxcclxuICAgIGVuZm9yY2U6ICdwcmUnLFxyXG4gICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XHJcbiAgICAgIGlmIChpZC5lbmRzV2l0aCgnLm1kJykpIHtcclxuICAgICAgICBjb25zdCBlbnY6IGFueSA9IHt9XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IG1kPy5yZW5kZXIoY29kZSwgZW52KVxyXG4gICAgICAgIGNvbnN0IHsgc2ZjQmxvY2tzIH0gPSBlbnZcclxuICAgICAgICBzZmNCbG9ja3Muc2NyaXB0cy5wdXNoKHNjcmlwdC5tZChpZCkpXHJcbiAgICAgICAgbGV0IGxpc3QgPSBbXHJcbiAgICAgICAgICBzZmNCbG9ja3M/LnNjcmlwdFNldHVwID8gc2ZjQmxvY2tzPy5zY3JpcHRTZXR1cD8uY29udGVudCA6ICcnLFxyXG4gICAgICAgICAgYDx0ZW1wbGF0ZT48ZGl2IDpjbGFzcz1cIl9fY2xzXCIgY2xhc3M9XCJ0aGVtZS1kZWZhdWx0LWNvbnRlbnRcIj4ke2h0bWx9PC9kaXY+PC90ZW1wbGF0ZT5cclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgICAuLi4oc2ZjQmxvY2tzPy5zY3JpcHRzLm1hcCgoaXRlbTogYW55KSA9PiBpdGVtLmNvbnRlbnQpID8/IFtdKSxcclxuICAgICAgICAgIC4uLihzZmNCbG9ja3M/LnN0eWxlcy5tYXAoKGl0ZW06IGFueSkgPT4gaXRlbS5jb250ZW50KSA/PyBbXSksXHJcbiAgICAgICAgICAuLi4oc2ZjQmxvY2tzPy5jdXN0b21CbG9ja3M/Lm1hcCgoaXRlbTogYW55KSA9PiBpdGVtLmNvbnRlbnQpID8/IFtdKVxyXG4gICAgICAgIF0uam9pbignXFxuJylcclxuICAgICAgICByZXR1cm4gbGlzdFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyB2aXRlUGx1Z2luTWQgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdml0ZVBsdWdpbk1kXHJc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
