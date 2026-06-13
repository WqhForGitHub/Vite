import { defineConfig } from 'vite'

// Markdown 编辑器 demo
export default defineConfig({
  server: { port: 5128, open: true },
  build: { outDir: 'dist' },
})
