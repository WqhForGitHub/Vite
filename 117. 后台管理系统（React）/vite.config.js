import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 后台管理系统（React）demo
export default defineConfig({
  plugins: [react()],
  server: { port: 5117, open: true },
  build: { outDir: 'dist' },
})
