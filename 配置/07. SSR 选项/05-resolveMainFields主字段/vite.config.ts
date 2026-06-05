// ssr.resolve.mainFields：SSR 包入口解析字段
//
// 类型：string[]
// 默认值：['module', 'jsnext:main', 'jsnext']
//
// 在解析一个包的入口文件时，会尝试使用 package.json 中的字段列表。
// 请注意，这些字段的优先级低于从条件导出解析的 exports 字段：
// 如果能从 exports 字段成功解析出入口文件，那么 main 字段将会被忽略。
// 此设置仅影响未外部化的依赖项。
//
// 字段说明：
// - 'module'：ESM 入口，优先使用（对应 package.json 中的 "module" 字段）
// - 'jsnext:main'：早期 ESM 入口约定（对应 "jsnext:main" 字段）
// - 'jsnext'：更早期的 ESM 入口约定（对应 "jsnext" 字段）
// - 'main'：CJS 入口（对应 "main" 字段，默认不在列表中）

import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    resolve: {
      // ========== mainFields 基础配置 ==========

      // 默认值：优先使用 ESM 入口
      mainFields: ['module', 'jsnext:main', 'jsnext'],

      // ========== 与 exports 字段的关系 ==========
      //
      // 如果包的 package.json 中有 exports 字段并且能成功解析，
      // 则 mainFields 会被忽略
      //
      // 例如某包的 package.json：
      // {
      //   "exports": {
      //     ".": {
      //       "import": "./dist/esm/index.js",
      //       "require": "./dist/cjs/index.js"
      //     }
      //   },
      //   "module": "./dist/esm/index.js",
      //   "main": "./dist/cjs/index.js"
      // }
      // → exports 优先，mainFields 不生效

      // ========== 自定义解析顺序 ==========

      // 优先使用 CJS 入口（某些包的 ESM 版本可能有问题）
      // mainFields: ['main', 'module', 'jsnext:main', 'jsnext'],

      // 仅使用 main 字段
      // mainFields: ['main'],

      // ========== 仅影响非外部化依赖项 ==========
      //
      // mainFields 仅对 ssr.noExternal 中列出的或 ssr.noExternal: true 时的
      // 依赖项生效。外部化的依赖项由 Node.js 自身的解析机制处理。

      // ========== 实际场景示例 ==========

      // 场景一：某些包的 ESM 版本不兼容 Node.js，优先使用 CJS
      // mainFields: ['main', 'module'],

      // 场景二：严格 ESM 优先策略
      // mainFields: ['module', 'jsnext:main', 'jsnext', 'main'],

      // 场景三：配合 ssr.noExternal 使用
      // ssr: {
      //   noExternal: ['problematic-package'],
      //   resolve: {
      //     mainFields: ['main', 'module'],
      //   },
      // },
    },
  },
})
