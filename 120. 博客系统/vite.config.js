import { defineConfig } from 'vite'

// 博客系统 demo
export default defineConfig({
  server: { port: 5120, open: true },
  build: { outDir: 'dist' },
})
