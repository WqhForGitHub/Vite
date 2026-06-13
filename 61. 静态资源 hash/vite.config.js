import { defineConfig } from 'vite'

// 静态资源 hash demo
// Vite 默认会为构建产物添加 hash，方便长期缓存
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 关闭内联，确保图片等资源单独输出文件以便观察 hash
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // JS 入口文件名（含 hash）
        entryFileNames: 'assets/js/[name].[hash].js',
        // 异步 chunk 文件名（含 hash）
        chunkFileNames: 'assets/js/[name].[hash].js',
        // 静态资源（css、图片、字体...）按类型分目录，含 hash
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(name)) {
            return 'assets/img/[name].[hash][extname]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name].[hash][extname]'
          }
          if (/\.css$/i.test(name)) {
            return 'assets/css/[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]'
        },
      },
    },
  },
})
