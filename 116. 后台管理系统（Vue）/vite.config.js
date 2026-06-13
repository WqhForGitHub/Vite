import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 后台管理系统（Vue）demo
export default defineConfig({
  plugins: [vue()],
  server: { port: 5116, open: true },
  build: { outDir: 'dist' },
})
