import { defineConfig } from 'vite'

// 重要：vite 生产构建的底层就是 Rollup
// 所以 vite.config.js 中的 build.rollupOptions 直接传给 rollup
export default defineConfig({
  server: { port: 5144, open: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
