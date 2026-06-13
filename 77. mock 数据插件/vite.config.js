import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// mock 数据插件：在 dev server 上拦截 /mock/** 的请求，返回 mock/*.json 的内容
function mockPlugin(options = {}) {
  const prefix = options.prefix || '/mock'
  const mockDir = path.resolve(process.cwd(), 'mock')

  return {
    name: 'mock-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith(prefix)) return next()

        const rel = req.url.slice(prefix.length).split('?')[0]
        // /mock/users -> mock/users.json
        const file = path.join(mockDir, rel + '.json')
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.setHeader('content-type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'mock not found', file }))
          return
        }
        const data = fs.readFileSync(file, 'utf-8')
        res.setHeader('content-type', 'application/json; charset=utf-8')
        res.end(data)
        console.log(`[mock] ${req.method} ${req.url} -> ${file}`)
      })
    },
  }
}

export default defineConfig({
  plugins: [mockPlugin()],
})
