import { defineConfig } from 'vite'

// 文档站（VitePress 风格）demo
// 注：这里用纯 Vite 模拟一个 VitePress 文档站结构。
// 生产环境推荐直接使用 VitePress: https://vitepress.dev
export default defineConfig({
  server: { port: 5121, open: true },
  build: { outDir: 'dist' },
})
