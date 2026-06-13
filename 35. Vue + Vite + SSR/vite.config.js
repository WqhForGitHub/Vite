import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 演示：Vue + Vite + SSR
// Vite 提供 createServer({ middlewareMode: true }) 与 ssrLoadModule
// 配合 Express 实现 SSR 渲染
export default defineConfig({
  plugins: [vue()],
})
