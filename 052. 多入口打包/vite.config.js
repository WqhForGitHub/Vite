import { defineConfig } from 'vite'
import { resolve } from 'path'

// 多入口打包 demo
// 通过 rollupOptions.input 配置多个 HTML 入口
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
