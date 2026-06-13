import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 演示：React + Vite + SSR
// 使用 Vite 中间件模式 + Express + react-dom/server 实现 SSR
export default defineConfig({
  plugins: [react()],
})
