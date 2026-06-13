import { defineConfig } from 'vite'

// 多语言系统（i18n）demo
export default defineConfig({
  server: { port: 5123, open: true },
  build: { outDir: 'dist' },
})
