import { defineConfig } from 'vite'

// 低代码平台 demo（类似 Vant 示例）
export default defineConfig({
  server: { port: 5118, open: true },
  build: { outDir: 'dist' },
})
