// resolve.alias：定义 import/require 语句中的路径别名
//
// 两种格式：
//   1. 对象格式 Record<string, string>：别名作为键，实际路径作为值
//   2. 数组格式 Array<{ find, replacement }>：适合复杂场景，支持正则匹配
//
// 注意事项：
//   - 条目的顺序很重要，最先定义的规则会首先应用
//   - 使用文件系统路径别名时，请始终使用绝对路径
//   - 相对路径的别名值会原封不动被使用，无法正常解析
import { defineConfig } from 'vite'
import path from 'node:path'

// 路径解析辅助函数
const resolve = (dir: string) => path.resolve(__dirname, dir)

export default defineConfig({
  resolve: {
    // ========== 对象格式 ==========
    alias: {
      // 将 @ 指向 src 目录（最常用的别名配置）
      '@': resolve('src'),

      // 将 @components 指向组件目录
      '@components': resolve('src/components'),

      // 将 @utils 指向工具函数目录
      '@utils': resolve('src/utils'),

      // 为 npm 包配置别名（Yarn/pnpm 支持 npm: 前缀）
      // 适用于 SSR 外部化依赖的场景
      // 'batman-1.0.0': './joker-1.5.0'
    },

    // ========== 数组格式（更灵活） ==========
    // alias: [
    //   { find: '@', replacement: resolve('src') },
    //   { find: '@components', replacement: resolve('src/components') },
    //   { find: '@utils', replacement: resolve('src/utils') },
    // ],

    // ========== 正则匹配 ==========
    // 当 find 是正则表达式时，replacement 可使用替换模式如 $1
    // alias: [
    //   // 去掉 .js 扩展名并替换为 .alias
    //   { find: /^(.*)\.js$/, replacement: '$1.alias' },
    //
    //   // 将所有 @/ 开头的导入指向 src/
    //   { find: /^@\/(.+)/, replacement: resolve('src') + '/$1' },
    // ],
  },
})

// 使用示例：
// 在代码中：
//   import Foo from '@/components/Foo.vue'    → 实际解析为 src/components/Foo.vue
//   import { helper } from '@utils/helper'    → 实际解析为 src/utils/helper
//   import Bar from '@components/Bar.vue'     → 实际解析为 src/components/Bar.vue
