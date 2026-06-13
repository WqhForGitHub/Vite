import { defineConfig } from 'vite'

// vendor 拆分 demo
// 将 node_modules 中的依赖单独打包成 vendor chunk
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 进一步细分 vendor
            if (id.includes('lodash')) return 'vendor-lodash'
            if (id.includes('dayjs')) return 'vendor-dayjs'
            return 'vendor'
          }
        },
      },
    },
  },
})
