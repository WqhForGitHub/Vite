import { defineConfig } from 'vite'

// 冷启动性能测试 demo
// 测试方法：
//   1) rm -rf node_modules/.vite  （清除预构建缓存）
//   2) time npm run dev            （观察 ready in 时间）
//   3) 反复修改 vite.config.js 中的 optimizeDeps 选项对比
export default defineConfig({
  // 启用 logger，启动时会输出 "vite vX.X ready in N ms"
  logLevel: 'info',
  clearScreen: false,

  optimizeDeps: {
    // 预扫描入口
    entries: ['index.html'],
    // 减少需要预构建的包数量可加快冷启动
    include: ['lodash-es'],
  },

  // 减少 server 启动后的额外工作
  server: {
    port: 5198,
    open: false,
    warmup: {
      // 预热常用文件，减少首次访问延迟
      clientFiles: ['./main.js', './src/**/*.js'],
    },
  },

  // 自定义 plugin 测量启动各阶段耗时
  plugins: [
    {
      name: 'cold-start-timer',
      configResolved() {
        globalThis.__vite_t0 = performance.now()
        console.log('[timer] configResolved at', globalThis.__vite_t0.toFixed(1), 'ms')
      },
      configureServer(server) {
        const elapsed = (performance.now() - globalThis.__vite_t0).toFixed(1)
        console.log(`[timer] configureServer 距 configResolved ${elapsed} ms`)
        server.httpServer?.once('listening', () => {
          const total = (performance.now() - globalThis.__vite_t0).toFixed(1)
          console.log(`[timer] httpServer listening 总耗时 ${total} ms`)
        })
      },
    },
  ],
})
