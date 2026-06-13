import { defineConfig } from 'vite'

// 热更新性能测试 demo
// 测量从文件保存到模块替换完成的耗时
function hmrTimerPlugin() {
  let start = 0
  return {
    name: 'hmr-timer',
    handleHotUpdate({ file, server }) {
      start = performance.now()
      console.log(`\n[hmr] file changed: ${file}`)
      // 客户端确认收到 update 后回报
      server.ws.send({
        type: 'custom',
        event: 'hmr:start',
        data: { file, start },
      })
    },
    configureServer(server) {
      server.ws.on('hmr:applied', (payload) => {
        const cost = (performance.now() - start).toFixed(1)
        console.log(`[hmr] applied in ${cost} ms`, payload)
      })
    },
  }
}

export default defineConfig({
  plugins: [hmrTimerPlugin()],

  server: {
    port: 5199,
    open: true,
    hmr: {
      overlay: true,
    },
    watch: {
      // 强制使用轮询时延迟（如在 docker / wsl 中）
      // usePolling: true,
      // interval: 100,
    },
  },
})
