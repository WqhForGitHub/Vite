import { defineConfig } from 'vite'

// base：部署时的公共基础路径，影响：
//   - HTML 中 script/link 的注入路径
//   - import.meta.env.BASE_URL
//   - 通过 import 引入的资源 URL 前缀
//   - public 目录资源的访问前缀
// 例如部署到 https://example.com/my-app/，则 base 应为 '/my-app/'
export default defineConfig({
  // 命令行 --base 参数会覆盖这里的值
  base: '/',
  build: { outDir: 'dist' },
  server: { port: 5173, open: true },
})
