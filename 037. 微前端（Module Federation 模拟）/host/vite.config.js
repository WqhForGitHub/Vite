import { defineConfig } from 'vite'

// 宿主应用：通过动态 import URL 加载远程模块
// 需要把 http://localhost:5174 加入 optimizeDeps.exclude 不打扰
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
})
