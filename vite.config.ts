import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5051, //启动端口
    hmr: {
      // 热更新的ip和端口
      host: '127.0.0.1',
      port: 5051
    },
    // 设置 https 代理
    proxy: {
      // '/api': {
      //   target: 'your https address',
      //   changeOrigin: true,
      //   rewrite: (path: string) => path.replace(/^\/api/, '')
      // }
    }
  }
})
