import { defineConfig } from 'vite'

// publicDir：默认是项目根目录下的 public/
// - 该目录里的文件不会被 Vite 处理（不会 hash、不会被 import 解析）
// - 始终以根路径 / 暴露：public/foo.png -> /foo.png
// - 适合放：robots.txt、favicon、不希望参与构建的静态文件
export default defineConfig({
  // 自定义 publicDir 名（默认即为 'public'）
  publicDir: 'public',
  server: { port: 5173, open: true },
})
