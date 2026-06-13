import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = express()

  // 以中间件模式创建 Vite 开发服务器，由 express 接管 HTTP
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      // 注入 Vite HMR client + 转换 HTML
      template = await vite.transformIndexHtml(url, template)

      // 加载服务端入口模块（支持 HMR）
      const { render } = await vite.ssrLoadModule('/src/entry-server.js')

      const { html: appHtml } = await render(url)
      const html = template.replace('<!--ssr-outlet-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173, () => {
    console.log('SSR dev server running at http://localhost:5173')
  })
}

createServer()
