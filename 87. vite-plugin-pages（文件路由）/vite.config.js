import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

// vite-plugin-pages: 基于文件系统自动生成 vue-router 路由
// 文档: https://github.com/hannoeru/vite-plugin-pages
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      // 扫描的目录
      dirs: 'src/pages',
      // 文件扩展名
      extensions: ['vue'],
      // 导入路径前缀
      importMode: 'async',
      // 排除文件
      exclude: ['**/components/*.vue'],
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    port: 5187,
    open: true,
  },
})
