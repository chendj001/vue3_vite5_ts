import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
// 自动导入组件-sfc
import ViteComponents from 'unplugin-vue-components/vite'
// 自动导入引用
import AutoImport from 'unplugin-auto-import/vite'
// 组件命名
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 渲染markdown
import vueMd from './src/plugins/vueMdPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueMd({
      shiki: {
        theme: 'dark-plus'
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
      dirs: ['./src/components', './src/hooks'],
      // 哪些文件类型应该被视为组件
      extensions: ['vue', 'tsx']
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router'],
      defaultExportByFilename: true,
      // 路径写全
      dirs: ['./src/components/**', './src/hooks/**'],
      dts: './auto-imports.d.ts',
      vueTemplate: false,
      resolvers: [],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    VitePWA({
      registerType: 'autoUpdate', devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
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
})
