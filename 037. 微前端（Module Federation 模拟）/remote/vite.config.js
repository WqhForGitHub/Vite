import { defineConfig } from 'vite'

// 远程应用：暴露组件供 host 通过 URL 动态 import
// 关键：开放 CORS，允许其它源加载模块
export default defineConfig({
  server: {
    port: 5174,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
