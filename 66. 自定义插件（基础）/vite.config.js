import { defineConfig } from 'vite'

// 一个最简单的自定义插件
function myFirstPlugin() {
  return {
    name: 'my-first-plugin', // 必填，插件名称
    // 配置完成后调用
    configResolved(resolvedConfig) {
      console.log('[my-first-plugin] configResolved, mode =', resolvedConfig.mode)
    },
    // 服务器配置完成后
    configureServer(server) {
      console.log('[my-first-plugin] configureServer')
      server.middlewares.use((req, res, next) => {
        if (req.url === '/hello') {
          res.end('Hello from my-first-plugin!')
          return
        }
        next()
      })
    },
    // 构建开始
    buildStart() {
      console.log('[my-first-plugin] buildStart')
    },
    // 构建结束
    buildEnd() {
      console.log('[my-first-plugin] buildEnd')
    },
  }
}

export default defineConfig({
  plugins: [myFirstPlugin()],
})
