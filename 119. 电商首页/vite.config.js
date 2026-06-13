import { defineConfig } from 'vite'

// 电商首页 demo
export default defineConfig({
  server: { port: 5119, open: true },
  build: { outDir: 'dist' },
})
