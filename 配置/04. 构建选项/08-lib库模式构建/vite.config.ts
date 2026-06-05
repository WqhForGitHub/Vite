// build.lib：以库的形式构建
//
// 类型：{
//   entry: string | string[] | { [entryAlias: string]: string },
//   name?: string,
//   formats?: ('es' | 'cjs' | 'umd' | 'iife')[],
//   fileName?: string | ((format: ModuleFormat, entryName: string) => string),
//   cssFileName?: string
// }
//
// entry 是必需的，因为库不能使用 HTML 作为入口。
// name 是暴露的全局变量，当 formats 包括 'umd' 或 'iife' 时必须使用。
// 默认的 formats 为 ['es', 'umd']，如果使用多个入口，则为 ['es', 'cjs']。
//
// fileName 是软件包输出文件的名称，默认为 package.json 中的 "name"。
// 它也可以定义为以 format 和 entryName 为参数的函数，并返回文件名。
//
// 如果软件包导入了 CSS，cssFileName 可用于指定 CSS 输出文件的名称。
// 如果设置为字符串，则默认值与 fileName 相同，
// 否则也会返回到 package.json 中的 "name"。

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== lib 基本配置 ==========

    lib: {
      // 入口文件（必需）
      entry: 'src/main.ts',

      // 全局变量名（UMD / IIFE 格式时必需）
      name: 'MyLib',

      // 输出格式，默认为 ['es', 'umd']
      // 多入口时默认为 ['es', 'cjs']
      formats: ['es', 'umd'],

      // 输出文件名（字符串或函数）
      fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,

      // CSS 输出文件名
      cssFileName: 'my-lib-style',
    },

    // ========== 单入口完整示例 ==========

    // lib: {
    //   entry: 'src/index.ts',
    //   name: 'MyLibrary',
    //   formats: ['es', 'umd'],
    //   fileName: 'my-library',
    //   cssFileName: 'my-library-style',
    // },

    // ========== 多入口配置 ==========

    // lib: {
    //   entry: ['src/index.ts', 'src/utils.ts'],
    //   // 多入口时 formats 默认为 ['es', 'cjs']（不能使用 umd/iife）
    //   formats: ['es', 'cjs'],
    //   fileName: (format, entryName) => `${entryName}.${format}.js`,
    // },

    // ========== 对象形式入口 ==========

    // lib: {
    //   entry: {
    //     index: 'src/index.ts',
    //     utils: 'src/utils.ts',
    //     components: 'src/components/index.ts',
    //   },
    //   formats: ['es', 'cjs'],
    //   fileName: (format, entryName) => `${entryName}.${format}.js`,
    // },

    // ========== IIFE 格式（浏览器直接使用）==========

    // lib: {
    //   entry: 'src/index.ts',
    //   name: 'MyLib',          // IIFE 必须指定 name
    //   formats: ['iife'],
    //   fileName: () => 'my-lib.min.js',
    // },

    // ========== 库模式的注意事项 ==========

    // 1. build.cssCodeSplit 在库模式下默认为 false
    // 2. build.assetsInlineLimit 在库模式下会被忽略，资源总是被内联
    // 3. build.modulePreload polyfill 不适用于库模式

    // ========== 配合 rolldownOptions ==========

    // 外部化依赖，不将它们打包进库
    // rolldownOptions: {
    //   external: ['react', 'react-dom', 'vue'],
    //   output: {
    //     // UMD 格式的外部依赖全局变量映射
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //       vue: 'Vue',
    //     },
    //   },
    // },
  },
})
