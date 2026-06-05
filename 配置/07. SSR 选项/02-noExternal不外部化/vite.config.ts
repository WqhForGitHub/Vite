// ssr.noExternal：防止 SSR 依赖项被外部化
//
// 类型：string | RegExp | (string | RegExp)[] | true
// 相关：SSR 外部化
//
// 防止列出的依赖项在 SSR 时被外部化，这些依赖项将会在构建过程中被打包。
// 默认情况下，只有软链接的依赖项不会被外部化（这是为了 HMR）。
// 如果希望将软链接的依赖项也外部化，可以将其名称传给 ssr.external 选项。
//
// - string：匹配依赖项名称的字符串
// - RegExp：匹配依赖项名称的正则表达式
// - (string | RegExp)[]：混合使用字符串和正则表达式
// - true：没有任何依赖项会被外部化
//
// 注意：
// 1. 如果 ssr.external 中明确列出了一些依赖项（使用 string[] 类型），
//    那么这些依赖项可以优先被外部化
// 2. 如果设置了 ssr.target: 'node'，那么 Node.js 的内置模块也会被默认外部化
// 3. 如果 ssr.noExternal: true 和 ssr.external: true 都被设置了，
//    那么 ssr.noExternal 将优先生效，没有任何依赖项会被外部化

import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    // ========== noExternal 基础配置 ==========

    // 默认行为：只有软链接的依赖项不被外部化（为了 HMR）
    // noExternal: [],

    // 使用字符串指定不外部化的依赖项
    noExternal: ['vue', '@vueuse/core'],

    // ========== 使用正则表达式 ==========

    // 使用正则表达式匹配不外部化的依赖项
    // noExternal: [/^@vue\//],

    // ========== 混合使用字符串和正则表达式 ==========

    // noExternal: ['vue', /^@my-org\//],

    // ========== 全部不外部化 ==========

    // 不外部化任何依赖项，全部打包到 SSR 构建中
    // noExternal: true,

    // ========== 优先级说明 ==========
    //
    // 1. ssr.external（string[] 类型）优先于 ssr.noExternal
    //    即使某个包出现在 noExternal 中，只要在 external 中明确列出，也会被外部化
    //
    // 2. ssr.noExternal: true 优先于 ssr.external: true
    //    当两者都设为 true 时，noExternal 优先生效，没有任何依赖项被外部化
    //
    // 例如（noExternal: true 优先）：
    // ssr: {
    //   external: true,    // 所有依赖项外部化
    //   noExternal: true,  // 优先生效：没有任何依赖项被外部化
    // }
    //
    // 例如（external string[] 优先）：
    // ssr: {
    //   external: ['lodash-es'],   // lodash-es 仍会被外部化（优先）
    //   noExternal: ['lodash-es'], // 此条对 lodash-es 不生效
    // }

    // ========== 实际场景示例 ==========

    // 场景一：打包所有 Vue 相关依赖（避免 Node.js 兼容问题）
    // noExternal: [/^vue/, /^@vue\//],

    // 场景二：仅打包特定有问题的 ESM 包
    // noExternal: ['problematic-package'],

    // 场景三：Cloudflare Workers 等非 Node.js 环境需要全部打包
    // noExternal: true,
  },
})
