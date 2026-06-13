import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 演示：React + Zustand
// Zustand 是一个轻量级状态管理库，无需 Provider，API 简洁
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
