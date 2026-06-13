import { defineConfig } from 'vite'

// 演示：单页面应用（SPA）
// 特点：只有一个 index.html，所有路由都由前端 JS 通过 hash 或 history 控制
// 这里使用纯 Vite + Vanilla JS 实现一个简易的 hash 路由
export default defineConfig({
  root: '.',
  base: '/',
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    // SPA 默认只有一个入口 index.html，无需特殊配置
  },
})
