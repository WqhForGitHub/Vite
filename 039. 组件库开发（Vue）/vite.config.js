import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// 演示：组件库开发（Vue）
// 使用 Vite Library Mode：build.lib
// 输出 ESM + UMD 双格式，外部化 vue 不打进库
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyVueLib',
      fileName: (format) => `my-vue-lib.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // 把 vue 视为外部依赖，不打进库产物
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
  server: { port: 5173, open: true },
})
