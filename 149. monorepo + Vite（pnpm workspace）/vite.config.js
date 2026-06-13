import { defineConfig } from 'vite'
import path from 'node:path'

// 根级 vite.config.js
// 注意：pnpm workspace 项目里，每个 package 推荐拥有自己的 vite.config.js。
// 这里提供一个根级配置作为「shared 默认值」，子 package 可以 import 后扩展。
// 同时演示根目录直接 `vite` 启动 web 包的能力。
export default defineConfig({
  root: path.resolve(__dirname, 'packages/web'),
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'packages/shared/src/index.js'),
    },
  },
  server: {
    port: 5149,
    open: true,
  },
})
