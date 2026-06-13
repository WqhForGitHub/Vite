import { defineConfig } from 'vite'

// 演示：server proxy 代理
// 用于在开发环境把符合规则的请求转发到后端服务器，避免跨域问题
export default defineConfig({
  root: '.',
  base: '/',

  server: {
    port: 5173,
    open: true,

    proxy: {
      // 1. 简写：所有 /api 开头的请求转发到 jsonplaceholder
      //    /api/posts -> https://jsonplaceholder.typicode.com/posts
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true, // 修改 Host 头，避免 CORS
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

      // 2. 正则匹配：/^\/socket\.io/ 转发到本地 ws 服务，并启用 ws 代理
      // '^/socket.io': {
      //   target: 'ws://localhost:3000',
      //   ws: true,
      // },

      // 3. 多路径合并示例
      '/github': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github/, ''),
        // 自定义请求头
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('User-Agent', 'vite-demo')
          })
        },
      },
    },
  },

  build: {
    outDir: 'dist',
  },
})
