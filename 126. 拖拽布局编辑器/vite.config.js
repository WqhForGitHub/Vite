import { defineConfig } from 'vite'

// 拖拽布局编辑器 demo
export default defineConfig({
  server: { port: 5126, open: true },
  build: { outDir: 'dist' },
})
