import { defineConfig } from 'vite'

// 视频播放器（Vite + player）demo
export default defineConfig({
  server: { port: 5130, open: true },
  build: { outDir: 'dist' },
})
