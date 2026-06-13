// 简化版 Vite SSR 服务器（middlewareMode）
import express from 'express'
import { createServer as createViteServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const { ssrRender } = await vite.ssrLoadModule('/src/entry-server.js')
      const { html } = await ssrRender(url)
      const finalHtml = template.replace('<!--ssr-outlet-->', html)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(5190, () => {
    console.log('SSR server: http://localhost:5190')
  })
}

main()
