import { defineConfig } from 'vite'

// 依赖预构建相关配置：
// - optimizeDeps.include / exclude
// - optimizeDeps.esbuildOptions
// - cacheDir
export default defineConfig({
  server: { port: 5143, open: true },
  cacheDir: 'node_modules/.vite',
  optimizeDeps: {
    include: [], // 强制预构建的依赖
    exclude: [], // 跳过预构建
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
