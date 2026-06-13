import { defineConfig } from 'vite'

// 自定义 output 文件名 demo
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 入口 chunk 文件名
        entryFileNames: 'js/[name]-[hash].js',
        // 代码分割的 chunk 文件名
        chunkFileNames: 'js/chunk-[name]-[hash].js',
        // 资源文件名（css, 图片等）
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(name)) {
            return 'images/[name]-[hash][extname]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
            return 'fonts/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name)) {
            return 'css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
