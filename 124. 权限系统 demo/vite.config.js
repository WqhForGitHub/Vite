import { defineConfig } from 'vite'

// 权限系统 demo
export default defineConfig({
  server: { port: 5124, open: true },
  build: { outDir: 'dist' },
})
