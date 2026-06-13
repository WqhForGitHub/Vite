import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// 多页面应用：通过 build.rollupOptions.input 声明多个 HTML 入口
// 每个 .html 都会被打包成一个独立的页面
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // key 会作为产物名
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
