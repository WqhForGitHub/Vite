import { defineConfig } from 'vite'

// 表单生成器 demo
export default defineConfig({
  server: { port: 5125, open: true },
  build: { outDir: 'dist' },
})
