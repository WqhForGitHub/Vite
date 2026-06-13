import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// vite-plugin-dts: 在库模式打包时为 .ts 源码生成 .d.ts 类型声明
// 文档: https://github.com/qmhc/vite-plugin-dts
export default defineConfig({
  plugins: [
    dts({
      // 输出目录（默认跟随 build.outDir）
      outDir: 'dist/types',
      // 是否在打包前清空声明输出目录
      cleanVueFileName: false,
      // 是否将所有 d.ts 合并为一个入口
      rollupTypes: true,
      // 包含/排除的源文件
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
      // 生成时是否检查类型错误
      staticImport: true,
      // 入口路径相对于 root 的清理
      insertTypesEntry: true,
    }),
  ],

  build: {
    outDir: 'dist',
    sourcemap: true,
    // 库模式打包：会输出 ESM/CJS + d.ts
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
      },
    },
  },

  server: {
    port: 5186,
    open: true,
  },
})
