import { defineConfig } from 'vite'

// DNS 预解析 demo:
// 通过 transformIndexHtml 在 <head> 注入 <link rel="dns-prefetch" /> 与 preconnect
// 也可以直接在 index.html 写。这里用插件演示如何动态注入
function dnsPrefetchPlugin(domains = []) {
  return {
    name: 'dns-prefetch-plugin',
    transformIndexHtml(html) {
      const tags = domains.flatMap((href) => [
        { tag: 'link', attrs: { rel: 'dns-prefetch', href }, injectTo: 'head-prepend' },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href, crossorigin: '' },
          injectTo: 'head-prepend',
        },
      ])
      return { html, tags }
    },
  }
}

export default defineConfig({
  plugins: [
    dnsPrefetchPlugin([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.github.com',
      'https://cdn.jsdelivr.net',
    ]),
  ],

  server: {
    port: 5111,
    open: true,
  },
})
