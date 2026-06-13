import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 演示：React + React Router
// 使用 react-router-dom v6 实现 SPA 路由
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
