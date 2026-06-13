import { defineConfig } from 'vite'

// middleware 模型实现 demo
// 演示 Vite 内部如何用「洋葱模型」串起多个 middleware（基于 connect）。
// 我们通过 configureServer 钩子向 vite.middlewares 注册多个中间件，
// 观察请求进入 / 退出每一层时打印的顺序，理解 next() 的串联机制。
//
// 同时实现 3 个常见用途的中间件：
//  - logger：请求日志
//  - mock：拦截 /api/* 返回 mock 数据
//  - timing：测量后续中间件耗时（在 next 前后打点）
export default defineConfig({
  server: {
    port: 5146,
    open: true,
  },
  plugins: [
    {
      name: 'middleware-model-demo',
      configureServer(server) {
        // 1. timing：包裹后续所有中间件，演示「先进后出」
        server.middlewares.use((req, res, next) => {
          const start = Date.now()
          console.log(`[timing] >> ${req.method} ${req.url}`)
          res.on('finish', () => {
            console.log(`[timing] << ${req.method} ${req.url} ${Date.now() - start}ms`)
          })
          next()
        })

        // 2. logger：仅打印日志，立即 next
        server.middlewares.use((req, res, next) => {
          console.log(`[logger] ${new Date().toISOString()} ${req.url}`)
          next()
        })

        // 3. mock：命中 /api/* 直接返回数据，不再 next
        server.middlewares.use('/api', (req, res, next) => {
          if (req.url === '/users') {
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify([
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
              ]),
            )
            return
          }
          if (req.url === '/time') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ now: Date.now() }))
            return
          }
          // 未命中的 /api/* 走 404
          res.statusCode = 404
          res.end(JSON.stringify({ error: 'mock not found' }))
        })

        // 4. 自定义页面：/__hello
        server.middlewares.use('/__hello', (req, res) => {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('Hello from custom middleware!\n时间: ' + new Date().toLocaleString())
        })

        console.log('[middleware-demo] 已注册 4 个中间件，依次为 timing -> logger -> mock -> hello')
      },
    },
  ],
})
