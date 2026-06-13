import { defineConfig } from 'vite'

// Vite SSR 配置（中间件模式）
// 文档: https://vitejs.dev/guide/ssr.html
export default defineConfig({
  // SSR 推荐用 middlewareMode 让 express/koa 接管，这里同时支持普通 dev
  server: {
    port: 5190,
    middlewareMode: false,
  },

  // SSR 专用选项
  ssr: {
    external: [],
    noExternal: [],
    target: 'node',
  },

  build: {
    outDir: 'dist/client',
    manifest: true,
    rollupOptions: {
      input: '/src/entry-client.js',
    },
  },
})
