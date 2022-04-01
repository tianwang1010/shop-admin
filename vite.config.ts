import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  resolve: {
    // 配置别名
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
    // 配置选项
      cache: false // 禁用eslint缓存
    })
  ],
  server: {
    proxy: {
      '/link': {
        target: 'https://shop.fed.lagounews.com/api/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/link/, '')
      }
    }
  }
})
