// ssr.external：SSR 外部化依赖配置
//
// 类型：string[] | true
// 相关：SSR 外部化
//
// 将指定的依赖项和它们传递的依赖项进行外部化，以供服务端渲染（SSR）使用。
// 默认情况下，所有的依赖项都会被外部化，除了那些被链接的依赖项（为了 HMR）。
// 如果希望将这些软链接的依赖项也外部化，可以将其名称传给该选项。
//
// - string[]：列出需要外部化的依赖项名称
// - true：所有依赖项（包括被链接的依赖项）都将被外部化
//
// 注意：如果在 ssr.external 中明确列出了一些依赖项（使用 string[] 类型），
// 那么其将始终被优先考虑，即使它们也在 ssr.noExternal 中被列出。

import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    // ========== external 基础配置 ==========

    // 默认行为：所有依赖项被外部化，但软链接的依赖项不外部化（为了 HMR）
    // external: [],

    // 将指定的依赖项外部化（包括其传递依赖项）
    external: ['lodash-es', 'axios'],

    // 将所有依赖项（包括软链接的依赖项）都外部化
    // external: true,

    // ========== 与软链接依赖项配合使用 ==========

    // 默认情况下，通过 npm link 或 pnpm link 链接的本地包不会被外部化
    // 如果希望将链接的依赖项也外部化，可以将其名称传给 ssr.external
    // external: ['my-linked-package'],

    // ========== 优先级说明 ==========
    //
    // ssr.external 的优先级高于 ssr.noExternal
    // 即使某个包同时出现在 ssr.noExternal 中，
    // 只要它在 ssr.external 中被明确列出（string[] 类型），就一定会被外部化
    //
    // 例如：
    // ssr: {
    //   external: ['lodash-es'],    // lodash-es 会被外部化
    //   noExternal: ['lodash-es'],  // 此条不生效，external 优先
    // }

    // ========== 实际场景示例 ==========

    // 场景一：外部化 Node.js 原生模块
    // external: ['better-sqlite3', 'sharp', 'bcrypt'],

    // 场景二：外部化所有依赖项（适用于纯 Node.js 运行时）
    // external: true,

    // 场景三：外部化有问题的 ESM 包
    // external: ['problematic-esm-package'],
  },
})
