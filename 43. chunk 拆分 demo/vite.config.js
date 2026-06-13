import { defineConfig } from 'vite'

// chunk 拆分 demo
// Vite 默认使用 Rollup，会基于动态 import 自动拆分 chunk
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 对每个 chunk 加上 hash 命名
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entry/[name]-[hash].js',
      },
    },
  },
})
