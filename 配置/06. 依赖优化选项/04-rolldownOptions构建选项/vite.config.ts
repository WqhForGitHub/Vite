// optimizeDeps.rolldownOptions：依赖优化过程中的 Rolldown 选项
//
// 类型：Omit<RolldownOptions, 'input' | 'logLevel' | 'output'> & {
//   output?: Omit<RolldownOutputOptions, 'format' | 'sourcemap' | 'dir' | 'banner'>
// }
//
// 在依赖扫描和优化过程中传递给 Rolldown 的选项
// 某些选项被省略，因为修改它们与 Vite 的优化方案不兼容：
//   - input：由 Vite 内部管理
//   - logLevel：由 Vite 内部管理
//   - output.format：固定为 ESM
//   - output.sourcemap：由 Vite 内部管理
//   - output.dir：由 Vite 内部管理
//   - output.banner：由 Vite 内部管理
//
// plugins 会与 Vite 的 dep 插件合并

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== rolldownOptions 配置 ==========

    rolldownOptions: {
      // 自定义输出选项
      output: {
        // 自定义 chunk 文件命名
        // entryFileNames: 'chunks/[name].js',

        // 全局变量定义（用于 UMD/IIFE 格式的外部依赖）
        // globals: {
        //   jquery: 'jQuery',
        // },
      },

      // 定义外部依赖（不参与优化的依赖）
      // external: ['some-large-lib'],

      // 自定义插件（与 Vite 的 dep 插件合并）
      // plugins: [],
    },

    // ========== 实际场景示例 ==========

    // 场景一：自定义依赖优化输出
    // rolldownOptions: {
    //   output: {
    //     entryFileNames: 'deps/[name].js',
    //   },
    // },

    // 场景二：排除大型依赖不参与优化
    // rolldownOptions: {
    //   external: ['monaco-editor'],
    // },

    // 场景三：添加自定义 Rolldown 插件处理特殊依赖
    // rolldownOptions: {
    //   plugins: [myCustomPlugin()],
    // },
  },
})
