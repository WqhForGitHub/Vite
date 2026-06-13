import { defineConfig } from 'vite'

// web 包的 vite 配置
// 由于使用 pnpm workspace 协议，@demo/shared 会被软链到 node_modules/@demo/shared，
// 直接 import 即可获得「源码级别 HMR」（修改 shared 包时 web 也热更新）。
export default defineConfig({
  server: {
    port: 5149,
    open: true,
    fs: {
      // 允许从 workspace 根目录读取文件（pnpm 软链需要）
      allow: ['../..'],
    },
  },
  optimizeDeps: {
    // workspace 内部包不预构建，保留源码 HMR
    exclude: ['@demo/shared'],
  },
})
