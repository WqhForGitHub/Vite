import { defineConfig } from 'vite'

// 自定义 HMR 插件示例：
// 1) 监听特定文件变化并通过 server.ws.send 主动推送自定义事件
// 2) 在 handleHotUpdate 中过滤/扩展 HMR 行为
function customHmrPlugin() {
  return {
    name: 'demo-custom-hmr',

    // 配置 dev 服务器：监听非 import 引用的文件
    configureServer(server) {
      server.watcher.add('**/data/*.json')

      server.watcher.on('change', (file) => {
        if (file.endsWith('.json') && file.includes('data')) {
          console.log('[custom-hmr] data changed:', file)
          // 主动给客户端发送自定义事件
          server.ws.send({
            type: 'custom',
            event: 'data:update',
            data: { file, time: Date.now() },
          })
        }
      })
    },

    // 自定义热更新行为
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx
      console.log('[custom-hmr] handleHotUpdate:', file)

      // 例：.md 文件改动时整页刷新
      if (file.endsWith('.md')) {
        server.ws.send({ type: 'full-reload' })
        return []
      }

      return modules
    },
  }
}

export default defineConfig({
  plugins: [customHmrPlugin()],

  server: {
    port: 5191,
    open: true,
    hmr: {
      // overlay 错误覆盖层
      overlay: true,
    },
  },
})
