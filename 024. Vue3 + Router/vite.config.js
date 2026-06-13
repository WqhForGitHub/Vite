import { defineConfig } from 'vite'

// 演示：base 配置部署路径
// base 用于子路径部署，例如把站点部署到 https://example.com/my-app/ 时
// 所有资源 url 都需要加前缀 /my-app/
export default defineConfig({
  root: '.',
  // 默认 '/'，当部署到子路径时改为 '/my-app/'
  // 也可以通过 CLI: vite build --base=/my-app/
  base: process.env.VITE_BASE || '/',

  server: { port: 5173, open: true },

  build: {
    outDir: 'dist',
  },
})
