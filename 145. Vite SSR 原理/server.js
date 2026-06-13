// Vite SSR 原理 demo 的开发服务器
// 核心流程：
// 1. 用 createServer 创建一个「中间件模式」的 Vite 实例
// 2. 通过 vite.ssrLoadModule 加载服务端入口（自动完成 ESM/CJS 转换）
// 3. 用 vite.transformIndexHtml 处理 index.html，注入 HMR 客户端 + 转换插件
// 4. 把 SSR 渲染好的字符串塞回模板的 <!--ssr-outlet-->
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function bootstrap() {
  const app = express()

  const vite = await createViteServer({
    root: __dirname,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.js')
      const { html: appHtml } = render(url)

      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const port = 5145
  app.listen(port, () => {
    console.log(`[ssr-demo] http://localhost:${port}`)
  })
}

bootstrap()
