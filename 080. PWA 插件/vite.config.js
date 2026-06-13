import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// 简易 PWA 插件：自动生成 manifest.webmanifest 和最小 service-worker.js
// 并在 index.html 中注入 link/meta 与注册脚本
function pwaPlugin(options = {}) {
  const manifest = {
    name: options.name || 'Vite PWA Demo',
    short_name: options.shortName || 'PWA',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#42b883',
    icons: [],
  }

  const swCode = `
const CACHE = 'pwa-cache-v1'
const ASSETS = ['/']
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)))
  self.skipWaiting()
})
self.addEventListener('activate', (e) => self.clients.claim())
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  )
})
`

  return {
    name: 'simple-pwa-plugin',
    configureServer(server) {
      // dev server 下提供 manifest 和 sw
      server.middlewares.use((req, res, next) => {
        if (req.url === '/manifest.webmanifest') {
          res.setHeader('content-type', 'application/manifest+json')
          res.end(JSON.stringify(manifest))
          return
        }
        if (req.url === '/service-worker.js') {
          res.setHeader('content-type', 'application/javascript')
          res.end(swCode)
          return
        }
        next()
      })
    },
    transformIndexHtml(html) {
      return html
        .replace(
          '</head>',
          `  <link rel="manifest" href="/manifest.webmanifest">\n  <meta name="theme-color" content="${manifest.theme_color}">\n</head>`,
        )
        .replace(
          '</body>',
          `  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('[PWA] sw 注册成功', reg.scope))
          .catch(err => console.error('[PWA] sw 注册失败', err))
      })
    }
  </script>\n</body>`,
        )
    },
    generateBundle() {
      // build 时把 manifest 和 sw 输出到 dist
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.webmanifest',
        source: JSON.stringify(manifest, null, 2),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'service-worker.js',
        source: swCode,
      })
    },
  }
}

export default defineConfig({
  plugins: [pwaPlugin({ name: 'My Vite PWA', shortName: 'VitePWA' })],
})
