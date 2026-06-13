import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// 简易版 vite-plugin-inspect：
// - 记录每个模块经过 transform 钩子前后的源码
// - 提供 /__inspect 路由，列出所有模块；点击查看详情
// 真实插件请使用 vite-plugin-inspect
function inspectPlugin() {
  /** @type {Map<string, { transforms: Array<{ name: string, code: string }> }>} */
  const records = new Map()

  return {
    name: 'simple-inspect-plugin',
    apply: 'serve',
    transform: {
      order: 'post',
      handler(code, id) {
        if (id.includes('node_modules')) return null
        if (id.startsWith('\0')) return null
        const list = records.get(id) || { transforms: [] }
        list.transforms.push({
          name: 'final',
          code: code.slice(0, 5000),
        })
        records.set(id, list)
        return null
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith('/__inspect')) return next()

        // 列表页
        if (req.url === '/__inspect' || req.url === '/__inspect/') {
          const items = [...records.keys()]
            .map(
              (id) => `<li><a href="/__inspect/module?id=${encodeURIComponent(id)}">${id}</a></li>`,
            )
            .join('')
          res.setHeader('content-type', 'text/html; charset=utf-8')
          res.end(
            `<!doctype html><meta charset="utf-8"><h1>Inspect</h1><p>已记录 ${records.size} 个模块</p><ul>${items}</ul>`,
          )
          return
        }

        // 详情页
        if (req.url.startsWith('/__inspect/module')) {
          const url = new URL(req.url, 'http://localhost')
          const id = url.searchParams.get('id')
          const rec = records.get(id)
          if (!rec) {
            res.statusCode = 404
            res.end('not found')
            return
          }
          const blocks = rec.transforms
            .map((t) => `<h3>${t.name}</h3><pre>${escape(t.code)}</pre>`)
            .join('')
          res.setHeader('content-type', 'text/html; charset=utf-8')
          res.end(
            `<!doctype html><meta charset="utf-8"><a href="/__inspect">&larr; 返回</a><h1>${id}</h1>${blocks}`,
          )
          return
        }

        next()
      })

      function escape(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      }

      console.log('\n[inspect] 访问 http://localhost:5173/__inspect 查看模块\n')
    },
  }
}

export default defineConfig({
  plugins: [inspectPlugin()],
})
