import { defineConfig } from 'vite'

// Tree Shaking demo
// Vite 基于 Rollup，开箱即支持 tree-shaking
// 关键：必须使用 ES Module + 标记 sideEffects
export default defineConfig({
  build: {
    minify: 'esbuild',
    rollupOptions: {
      treeshake: {
        // 'smallest' | 'safest' | 'recommended'
        preset: 'recommended',
        // 假设模块没有副作用（更激进的摇树）
        moduleSideEffects: false,
      },
    },
  },
})
