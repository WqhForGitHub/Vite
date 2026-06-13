import { defineConfig } from 'vite'

// build cache 实验 demo
//
// Vite 的缓存主要分两类：
// 1. 依赖预构建缓存：node_modules/.vite/deps（dev 阶段加速冷启动）
// 2. 构建（rollup）阶段：本身没有持久化的「build cache」，
//    但通过 cacheDir 控制 dev 预构建目录的位置；
//    对 build 来说，可以通过 esbuild 的内部缓存 + content hash 文件名做长期缓存。
//
// 本 demo 演示：
// - 自定义 cacheDir 位置
// - 通过 optimizeDeps.force 控制是否强制重建依赖缓存
// - 通过 scripts/time.js 对比首次/二次构建耗时差异
export default defineConfig({
  // 自定义缓存目录（默认 node_modules/.vite）
  cacheDir: 'node_modules/.vite-cache',

  optimizeDeps: {
    // 设为 true 时会忽略缓存重新预构建
    force: false,
    // 显式声明需要预构建的依赖（dev 时有效）
    include: ['lodash-es', 'dayjs'],
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // 使用 contenthash，便于长期缓存（CDN/浏览器侧）
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
    // 报告压缩前后大小
    reportCompressedSize: true,
  },
})
