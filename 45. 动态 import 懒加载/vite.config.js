import { defineConfig } from 'vite'

// 动态 import 懒加载 demo
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 让懒加载 chunk 命名清晰
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
})
