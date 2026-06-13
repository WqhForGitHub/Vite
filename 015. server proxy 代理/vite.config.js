import { defineConfig } from 'vite'

// server.proxy：开发服务器代理，用于解决前端开发跨域问题
// 原理：dev server 拦截到匹配 key 的请求，按 target 转发，浏览器请求依旧打的是 dev server 同源
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 1) 字符串简写：/foo -> http://localhost:5174/foo
      // '/foo': 'http://localhost:5174',

      // 2) 对象写法（最常用）：把 /api/xxx 转发到第三方 API，并去掉 /api 前缀
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true, // 必须开启，伪装 host 头
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

      // 3) 正则匹配：所有 /img/ 开头的转发到图床
      '^/img/.*': {
        target: 'https://picsum.photos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, ''),
      },

      // 4) WebSocket 代理示例
      // '/ws': {
      //   target: 'ws://localhost:8080',
      //   ws: true,
      // },
    },
  },
})
