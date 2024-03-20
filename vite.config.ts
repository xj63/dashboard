import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-meta-layouts'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import regexpPlugin from 'rollup-plugin-regexp'
import * as mdicons from '@mdi/js'
import viteCompression from "vite-plugin-compression";

const mdi: Record<string, string> = {}
Object.keys(mdicons).forEach((key) => {
  const value = (mdicons as Record<string, string>)[key]
  mdi[
    key.replace(
      /[A-Z]+(?![a-z])|[A-Z0-9]/g,
      ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
    )
  ] = value
})

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dashboard',
  plugins: [
    viteCompression({
      filter: "/.(js|css|json|txt|html|ico|svg)(?.*)?$/i", // 需要压缩的文件
      threshold: 1024, // 文件容量(字节)大于这个值进行压缩
      // algorithm: 'brotliCompress', // 使用brotli压缩算法
      algorithm: "gzip", // 压缩方式
      ext: "gz", // 后缀名
      deleteOriginFile: false, // 压缩后是否删除压缩源文件
    }),
    regexpPlugin({
      exclude: ['node_modules/**'],
      find: /\b(?<![/\w])(mdi-[\w-]+)\b(?!\.)/,
      replace: (match: string) => {
        if (mdi[match]) {
          return mdi[match]
        } else {
          console.warn('[plugin-regexp] No matched svg icon for ' + match)
          return match
        }
      },
      sourcemap: false,
    }),
    VueRouter({ importMode: 'sync', dts: './src/typed-router.d.ts' }),
    Vue({ template: { transformAssetUrls } }),
    Layouts(),
    Vuetify({ autoImport: true }),
    Components({ dts: './src/components.d.ts', types: [] }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        VueRouterAutoImports,
        {
          vuetify: [
            'useTheme',
            'useRtl',
            'useLocale',
            'useDisplay',
            'useLayout',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/stores'],
    }),
  ],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    include: ['test/**/*.{test,spec}.ts', 'src/**/__tests__/*'],
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    server: { deps: { inline: ['vuetify'] } },
  },
})
