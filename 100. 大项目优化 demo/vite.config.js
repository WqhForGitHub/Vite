import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// 大项目优化 demo：综合策略
// 1) 分包（manualChunks）  2) tree-shaking  3) gzip  4) preload
// 5) optimizeDeps include  6) 异步路由 / 动态 import
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(), // 自动按 node_modules 拆 vendor
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],

  // 别名缩短深路径
  resolve: {
    alias: { '@': '/src' },
  },

  // 仅预构建真正常用的依赖
  optimizeDeps: {
    include: ['lodash-es', 'dayjs'],
    exclude: [],
  },

  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true, // 每个异步 chunk 独立 css
    chunkSizeWarningLimit: 1000, // 大文件警告阈值（kb）
    minify: 'esbuild', // esbuild 压缩更快
    reportCompressedSize: false, // 关闭压缩大小报告，加快构建
    rollupOptions: {
      output: {
        // 手动分包：把超大依赖独立出来
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lodash')) return 'vendor-lodash'
            if (id.includes('dayjs')) return 'vendor-dayjs'
            return 'vendor'
          }
          if (id.includes('/src/utils/')) return 'utils'
        },
        // 资源命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
  },

  server: {
    port: 5100,
    open: true,
  },
})
