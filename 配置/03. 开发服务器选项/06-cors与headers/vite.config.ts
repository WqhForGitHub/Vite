// cors 与 headers：CORS 跨域配置与自定义响应头
//
// cors：为开发服务器配置 CORS
//   类型：boolean | CorsOptions
//   默认：{ origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/ }
//   默认允许 localhost、127.0.0.1 和 ::1
//   传递选项对象来调整行为，或设为 true 允许任何源
//
// headers：指定服务器响应的 header
//   类型：OutgoingHttpHeaders
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // ========== cors 配置 ==========

    // 默认：仅允许 localhost 来源
    // cors: {
    //   origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
    // },

    // 自定义 CORS 选项
    cors: {
      // 允许的来源
      origin: ['http://localhost:3000', 'http://localhost:8080'],
      // 允许的 HTTP 方法
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      // 允许的请求头
      allowedHeaders: ['Content-Type', 'Authorization'],
      // 预检请求的缓存时间（秒）
      maxAge: 86400,
      // 是否允许发送 Cookie
      credentials: true,
    },

    // ⚠️ 危险：允许任何源（不推荐，会暴露源代码和内容）
    // cors: true,

    // ========== headers 配置 ==========

    // 自定义服务器响应头
    headers: {
      // 禁用缓存（开发时常用）
      'Cache-Control': 'no-store',
      // 安全相关头
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      // 自定义头
      'X-Custom-Header': 'my-vite-dev-server',
    },
  },
})
