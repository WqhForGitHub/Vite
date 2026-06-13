import { defineConfig } from 'vite'
import { resolve } from 'path'

// UMD, ESM 输出 demo
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyUtils', // UMD 全局变量名
      formats: ['es', 'umd'], // 同时输出 ESM 和 UMD
      fileName: (format) => {
        if (format === 'es') return 'my-utils.esm.js'
        if (format === 'umd') return 'my-utils.umd.js'
        return `my-utils.${format}.js`
      },
    },
    rollupOptions: {
      // 例如把 lodash-es 标记为外部依赖（UMD 时通过 globals 映射全局变量名）
      external: ['lodash-es'],
      output: {
        globals: {
          'lodash-es': '_',
        },
        exports: 'named',
      },
    },
  },
})
