import { defineConfig } from 'vite'

// Vite SSR 原理 demo 配置
// 关键点：
// 1. ssr 入口由 server.js 中通过 vite.ssrLoadModule 动态加载
// 2. vite 在中间件模式下只承担「转换 + HMR」职责，不直接监听端口
// 3. build 时使用 --ssr 参数，输出 Node 可执行的服务端 bundle
export default defineConfig({
  appType: 'custom',
  server: {
    middlewareMode: true,
  },
  build: {
    minify: false,
  },
})
