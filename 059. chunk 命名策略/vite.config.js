import { defineConfig } from 'vite'

// chunk 命名策略 demo
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 入口 chunk
        entryFileNames: 'js/entry-[name].[hash].js',
        // 异步/分包 chunk（可使用函数动态命名）
        chunkFileNames(chunkInfo) {
          // chunkInfo.name / chunkInfo.facadeModuleId / chunkInfo.moduleIds
          if (chunkInfo.name?.startsWith('vendor')) {
            return 'js/vendor/[name].[hash].js'
          }
          if (chunkInfo.facadeModuleId?.includes('pages')) {
            return 'js/pages/[name].[hash].js'
          }
          return 'js/chunk/[name].[hash].js'
        },
        // 资源文件按类型分目录
        assetFileNames(assetInfo) {
          const name = assetInfo.name || ''
          const ext = name.split('.').pop()
          if (/png|jpe?g|gif|svg|webp/.test(ext)) {
            return 'assets/img/[name].[hash][extname]'
          }
          if (/woff2?|eot|ttf|otf/.test(ext)) {
            return 'assets/font/[name].[hash][extname]'
          }
          if (ext === 'css') return 'assets/css/[name].[hash][extname]'
          return 'assets/[name].[hash][extname]'
        },
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
