import { defineConfig } from 'vite'

// 在线代码编辑器 demo
export default defineConfig({
  server: { port: 5127, open: true },
  build: { outDir: 'dist' },
})
