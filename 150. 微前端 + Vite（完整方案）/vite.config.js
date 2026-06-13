import { defineConfig } from 'vite'
import path from 'node:path'

// 根级 vite.config.js
// 默认作为 host（主应用）的别名入口，方便直接 `vite` 启动。
// 真正的多应用配置见 host/、app1/、app2/ 三个子目录。
export default defineConfig({
  root: path.resolve(__dirname, 'host'),
  server: {
    port: 5150,
    open: true,
    cors: true,
  },
})
