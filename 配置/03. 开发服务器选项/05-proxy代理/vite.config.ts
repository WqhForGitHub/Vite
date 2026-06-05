// proxy：为开发服务器配置自定义代理规则
//
// 类型：Record<string, string | ProxyOptions>
//
// 期望接收一个 { key: options } 对象。
// 任何请求路径以 key 值开头的请求将被代理到对应的目标。
// 如果 key 值以 ^ 开头，将被识别为 RegExp。
// configure 选项可用于访问 proxy 实例。
// 如果请求匹配任何配置的代理规则，该请求将不会被 Vite 转换。
//
// 继承自 http-proxy-3。
//
// 注意：如果使用了非相对的基础路径 base，则必须在每个 key 值前加上该 base。
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      // ========== 方式一：字符串简写 ==========
      // http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',

      // ========== 方式二：带选项写法 ==========
      // http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径：移除 /api 前缀
      },

      // ========== 方式三：正则表达式写法 ==========
      // http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },

      // ========== 方式四：使用 proxy 实例 ==========
      '/api-proxy': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
          // 可以在这里添加自定义事件监听
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode)
          })
        },
      },

      // ========== 方式五：代理 WebSocket ==========
      // ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true, // 启用 WebSocket 代理
        // ⚠️ 在使用 rewriteWsOrigin 时要特别谨慎，
        // 因为这可能会让代理服务器暴露在 CSRF 攻击之下
        rewriteWsOrigin: true,
      },
    },
  },
})
