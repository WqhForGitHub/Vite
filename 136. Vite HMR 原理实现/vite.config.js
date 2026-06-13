import { defineConfig } from 'vite'

// Vite HMR 原理实现 demo
// 该 demo 主要演示 Vite 自带的 import.meta.hot HMR API 用法
// 同时附带一个自定义插件，把 HMR 事件转发到页面，便于观察原理。
export default defineConfig({
  root: '.',
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5175,
    open: true,
    strictPort: false,
    // 显式开启 HMR（默认即开启）
    hmr: {
      // 可自定义 overlay、port 等
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015',
  },
  preview: {
    port: 4175,
  },
  plugins: [
    // 简易自定义插件：通过 server.ws 发送自定义事件，演示 HMR 通道
    {
      name: 'hmr-event-broadcaster',
      configureServer(server) {
        // 每 5 秒向所有客户端发送一次自定义事件，演示 ws.send
        const timer = setInterval(() => {
          server.ws.send({
            type: 'custom',
            event: 'server:tick',
            data: { ts: Date.now() },
          })
        }, 5000)
        server.httpServer?.once('close', () => clearInterval(timer))
      },
      // 拦截热更新事件，添加日志（仅打印到 Vite 终端）
      handleHotUpdate({ file, modules, server }) {
        const rel = file.replace(server.config.root, '')
        console.log(`[HMR] 文件更新：${rel}，受影响模块数：${modules.length}`)
        // 通过 ws 把热更事件转发给浏览器演示页
        server.ws.send({
          type: 'custom',
          event: 'hmr:file-changed',
          data: { file: rel, modules: modules.length, ts: Date.now() },
        })
        // 不修改默认行为，返回 undefined 让 Vite 继续走默认 HMR 流程
      },
    },
  ],
})
