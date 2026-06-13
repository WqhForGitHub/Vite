import { defineConfig } from 'vite'

// 手动分包 manualChunks demo
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 对象写法：包名 -> 模块数组
        manualChunks: {
          // 将 lodash-es 单独打成一个 chunk
          'lodash-vendor': ['lodash-es'],
          // 工具函数集中打包
          utils: ['./src/utils/format.js', './src/utils/math.js'],
        },
        // 也可以使用函数写法：
        // manualChunks(id) {
        //   if (id.includes('node_modules')) return 'vendor'
        // }
      },
    },
  },
})
