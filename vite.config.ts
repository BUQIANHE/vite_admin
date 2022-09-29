import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          axios: [['default', 'axios']],
          '@/utils': ['useStaticFiles']
        }
      ],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      dirs: ['src/components', 'src/layout/components', 'src/**/components'],
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./namespace.scss" as *;`
      }
    }
  },
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5051, //启动端口
    // host: '0.0.0.0',
    hmr: {
      // 热更新的ip和端口
      host: '127.0.0.1',
      port: 5051
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://192.168.50.78:9899',
        // target: 'http://192.168.1.4:9899',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
