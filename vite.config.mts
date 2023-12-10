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
  base: process.env.NODE_ENV == 'development' ? '/' : '/vue3_vite5_ts/',
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
      registerType: 'prompt',
      devOptions: {
        enabled: true
      },
      // workbox: {
      //   cleanupOutdatedCaches: false
      // },
      includeAssets: ['logo.svg'],
      manifest: {
        name: '双刃战意',
        short_name: '双刃战意',
        description: '双刃战意 描述',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
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


