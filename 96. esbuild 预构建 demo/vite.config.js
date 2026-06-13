import { defineConfig } from 'vite'

// esbuild 预构建（依赖预构建）演示
// 启动 dev 时，Vite 会用 esbuild 将 CommonJS 包 / 多文件 ESM 包打成单个 ESM bundle
// 缓存目录：node_modules/.vite/deps
// 文档: https://vitejs.dev/guide/dep-pre-bundling.html
export default defineConfig({
  // 直接配置 esbuild 用于源码 transform
  esbuild: {
    target: 'es2020',
    jsx: 'automatic',
    drop: ['debugger'], // 生产移除 debugger
    legalComments: 'none',
    keepNames: true,
  },

  optimizeDeps: {
    // 强制预构建以下依赖
    include: ['lodash-es', 'dayjs'],
    // 排除（不预构建，按原样保留）
    exclude: [],
    // 自定义 esbuild 选项
    esbuildOptions: {
      target: 'es2020',
      define: {
        global: 'globalThis',
      },
      // 当包是 CommonJS / UMD 时常配
      // supported: { 'top-level-await': true },
    },
    // 强制重新预构建（也可以删除 node_modules/.vite/deps）
    // force: true,
  },

  server: {
    port: 5196,
    open: true,
  },
})
