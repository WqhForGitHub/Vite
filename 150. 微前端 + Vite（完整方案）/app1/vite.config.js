import { defineConfig } from 'vite'
import path from 'node:path'

// 子应用 App1 配置
// 关键点：
// 1. 必须开启 cors，否则 host 跨端口加载会被浏览器拦截
// 2. base 设置为绝对 URL（dev 阶段可用相对，生产部署时必须改成 CDN/独立域名）
// 3. 输出 ESM，host 直接 import()
export default defineConfig({
  root: __dirname,
  server: {
    port: 5151,
    cors: true,
    origin: 'http://localhost:5151',
    hmr: { port: 5161 },
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/app1'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/bootstrap.js'),
      output: {
        format: 'es',
        entryFileNames: 'bootstrap.js',
      },
    },
  },
})
