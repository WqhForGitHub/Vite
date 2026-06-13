import { defineConfig } from 'vite'

// CSS 分离 demo
// cssCodeSplit: true 时，每个 chunk 引入的 css 会被分离成独立 .css 文件
export default defineConfig({
  build: {
    // 启用 CSS 代码分离（默认 true）
    // 设为 false 则把所有 CSS 合并到一个文件
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
