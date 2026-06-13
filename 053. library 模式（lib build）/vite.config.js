import { defineConfig } from 'vite'
import { resolve } from 'path'

// library 模式（lib build）demo
export default defineConfig({
  build: {
    lib: {
      // 库入口文件
      entry: resolve(__dirname, 'src/index.js'),
      // 暴露的全局变量名（UMD/IIFE 必须）
      name: 'MyLib',
      // 输出文件名前缀
      fileName: (format) => `my-lib.${format}.js`,
      // 输出格式
      formats: ['es', 'umd', 'cjs', 'iife'],
    },
    rollupOptions: {
      // 不需要打包到库内的依赖
      external: [],
      output: {
        // UMD/IIFE 下，external 依赖在全局变量中的对应名称
        globals: {},
      },
    },
  },
})
