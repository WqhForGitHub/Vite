import { defineConfig } from 'vite'

// CDN 加载依赖 demo
// 思路：将依赖声明为 external + import map，构建时不打包，
// 运行时通过浏览器原生 ESM CDN 加载。
export default defineConfig({
  build: {
    rollupOptions: {
      // 这些依赖不会被打包，需运行时由 importmap 提供
      external: ['vue', 'lodash-es'],
    },
  },
})
