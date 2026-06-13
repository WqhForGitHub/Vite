// ssr.resolve.conditions / ssr.resolve.externalConditions
// SSR 解析条件配置
//
// ssr.resolve.conditions
//   类型：string[]
//   默认值：['module', 'node', 'development|production']（当 ssr.target === 'webworker' 时为 ['module', 'browser', 'development|production']）
//   相关：解析条件
//   这些条件会在插件管道中使用，并且只会影响 SSR 构建期间的非外部化依赖项。
//   使用 ssr.resolve.externalConditions 来影响外部化导入。
//
// ssr.resolve.externalConditions
//   类型：string[]
//   默认值：['node']
//   在对外部化的直接依赖项（由 Vite 导入的外部依赖项）进行 SSR 导入
//   （包括 ssrLoadModule）期间所使用的条件。
//
// 提示：使用该选项时，请确保在开发和构建中使用 --conditions flag
//       以相同的值运行 Node，以获得一致的行为。
//   例如，当设置 ['node', 'custom'] 时：
//     dev 中运行：NODE_OPTIONS='--conditions custom' vite
//     build 后运行：NODE_OPTIONS="--conditions custom" node ./dist/server.js

import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    // ========== resolve.conditions 配置 ==========

    // 默认值（ssr.target === 'node' 时）：
    // conditions: ['module', 'node', 'development|production'],

    // 默认值（ssr.target === 'webworker' 时）：
    // conditions: ['module', 'browser', 'development|production'],

    // 自定义解析条件（影响非外部化依赖项）
    // conditions: ['module', 'node', 'development|production', 'custom'],

    // ========== resolve.externalConditions 配置 ==========

    // 默认值：仅 'node'
    // externalConditions: ['node'],

    // 添加自定义条件（影响外部化依赖项的导入）
    // externalConditions: ['node', 'custom'],

    // ========== conditions 与 externalConditions 的区别 ==========
    //
    // conditions：影响 SSR 构建期间被打包（非外部化）的依赖项解析
    // externalConditions：影响外部化依赖项在运行时的导入条件
    //
    // 如果你的依赖项大部分被外部化（默认行为），
    // 那么应该主要关注 externalConditions
    //
    // 如果你的依赖项大部分被打包（ssr.noExternal: true），
    // 那么应该主要关注 conditions

    // ========== 实际场景示例 ==========

    // 场景一：使用自定义条件导出
    // resolve: {
    //   conditions: ['module', 'node', 'development|production', 'deno'],
    //   externalConditions: ['node', 'deno'],
    // },

    // 场景二：为 Edge Runtime 添加条件
    // resolve: {
    //   conditions: ['module', 'browser', 'development|production', 'edge-light'],
    //   externalConditions: ['node', 'edge-light'],
    // },

    // 场景三：确保开发和构建一致性
    // 设置 externalConditions: ['node', 'custom'] 后：
    //   开发：NODE_OPTIONS='--conditions custom' vite
    //   构建：NODE_OPTIONS='--conditions custom' node ./dist/server.js
  },
})
