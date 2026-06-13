import { defineConfig } from 'vite'

// 组件库文档系统 demo
export default defineConfig({
  server: { port: 5122, open: true },
  build: { outDir: 'dist' },
})
