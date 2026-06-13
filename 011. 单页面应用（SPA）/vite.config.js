import { defineConfig } from 'vite'

// SPA：只有一个 index.html 入口，所有路由由前端 JS 控制
// 关键点：history 模式下，dev/preview 都需要 fallback 到 index.html
//        Vite dev server 默认就支持 SPA fallback
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
})
