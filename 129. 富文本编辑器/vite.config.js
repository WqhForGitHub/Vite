import { defineConfig } from 'vite'

// 富文本编辑器 demo（基于 contenteditable）
export default defineConfig({
  server: { port: 5129, open: true },
  build: { outDir: 'dist' },
})
