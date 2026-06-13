import { defineConfig } from 'vite'
import { resolve } from 'path'

// externals 配置 demo
// 把 vue / lodash-es 等运行时依赖标记为外部，
// 不会被打入产物，由使用方提供。
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyComp',
      formats: ['es', 'umd'],
      fileName: (format) => `my-comp.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'lodash-es'],
      output: {
        globals: {
          vue: 'Vue',
          'lodash-es': '_',
        },
      },
    },
  },
})
