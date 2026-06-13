import { defineConfig } from 'vite'

// 数据大屏 demo
export default defineConfig({
  server: { port: 5133, open: true },
  build: { outDir: 'dist' },
})
