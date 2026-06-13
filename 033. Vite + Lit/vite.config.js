import { defineConfig } from 'vite'

// 演示：Vite + Lit
// Lit 基于 Web Components 标准，零运行时编译需求，Vite 直接支持
export default defineConfig({
  server: { port: 5173, open: true },
  build: {
    lib: false, // 这里作为应用 demo
  },
})
