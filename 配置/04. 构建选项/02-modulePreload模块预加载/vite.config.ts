// build.modulePreload：控制模块预加载 polyfill 注入与依赖解析
//
// 类型：boolean | { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }
// 默认值：{ polyfill: true }
//
// 默认情况下，一个模块预加载 polyfill 会被自动注入。该 polyfill 会自动注入到
// 每个 index.html 入口的代理模块中。如果构建通过 build.rolldownOptions.input
// 被配置为了使用非 HTML 入口的形式，那么必须要在你的自定义入口中手动引入该 polyfill：
//
//   import 'vite/modulepreload-polyfill'
//
// 此 polyfill 可以通过 { polyfill: false } 来禁用。
// 注意：此 polyfill 不适用于 Library 模式。
//
// resolveDependencies 函数支持对依赖项列表及其路径进行细粒度控制：
//   type ResolveModulePreloadDependenciesFn = (
//     url: string,
//     deps: string[],
//     context: {
//       hostId: string
//       hostType: 'html' | 'js'
//     },
//   ) => string[]
//
// build.polyfillModulePreload（已废弃）
// 类型：boolean
// 默认：true
// 请使用 build.modulePreload.polyfill 替代

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== modulePreload 基本配置 ==========

    // 默认行为：自动注入模块预加载 polyfill
    // modulePreload: { polyfill: true },

    // 禁用模块预加载 polyfill
    // 适用场景：目标浏览器原生支持模块预加载，或不需要兼容旧浏览器
    // modulePreload: { polyfill: false },

    // 简写：直接设为 false 等同于 { polyfill: false }
    // modulePreload: false,

    // 简写：直接设为 true 等同于 { polyfill: true }
    modulePreload: true,

    // ========== resolveDependencies 细粒度控制 ==========

    // resolveDependencies 函数会在每次动态导入时被调用，
    // 并包含其依赖的 chunk 列表。
    // 同时也会在入口 HTML 文件中导入每个 chunk 时被调用。
    // 你可以返回一个新的依赖数组，其中可以过滤掉或注入更多的依赖，
    // 或修改它们的路径。deps 路径是相对于 build.outDir 的。
    // 返回值应是对于 build.outDir 的相对路径。

    // modulePreload: {
    //   polyfill: true,
    //   resolveDependencies: (url, deps, { hostId, hostType }) => {
    //     // url: 当前模块的 URL
    //     // deps: 依赖的 chunk 列表（相对于 outDir 的路径）
    //     // hostId: 宿主模块 ID
    //     // hostType: 宿主类型 — 'html' 或 'js'
    //
    //     // 示例一：过滤掉不需要预加载的依赖
    //     return deps.filter((dep) => !dep.includes('heavy-module'))
    //
    //     // 示例二：修改依赖路径（例如添加 CDN 前缀）
    //     // return deps.map((dep) => `/cdn-prefix/${dep}`)
    //
    //     // 示例三：注入额外的依赖
    //     // return [...deps, 'extra-chunk.js']
    //   },
    // },

    // ========== 已废弃选项 ==========

    // build.polyfillModulePreload 已废弃
    // 请使用 build.modulePreload.polyfill 替代
    // polyfillModulePreload: true,  // ❌ 已废弃
    // modulePreload: { polyfill: true },  // ✅ 新写法
  },
});
