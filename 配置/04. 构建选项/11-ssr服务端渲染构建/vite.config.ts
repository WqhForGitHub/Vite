// build.ssr / emitAssets / ssrEmitAssets
// SSR 构建配置与静态资源输出控制
//
// build.ssr
//   类型：boolean | string
//   默认值：false
//   生成面向 SSR 的构建。此选项的值可以是字符串，
//   用于直接定义 SSR 的入口，也可以为 true，
//   但这需要通过设置 rolldownOptions.input 来指定 SSR 的入口。
//
// build.emitAssets
//   类型：boolean
//   默认：false
//   在非客户端的构建过程中，静态资源并不会被输出，
//   因为我们默认它们会作为客户端构建的一部分被输出。
//   这个选项允许框架在其他环境的构建中强制输出这些资源。
//   而将这些资源合并起来则是框架在构建后步骤中的责任。
//
// build.ssrEmitAssets（已弃用）
//   类型：boolean
//   默认：false
//   在 SSR 构建期间，静态资源不会被输出，
//   因为它们通常被认为是客户端构建的一部分。
//   这个选项允许框架强制在客户端和 SSR 构建中都输出它们。
//   一旦环境 API 稳定，这个选项将被 build.emitAssets 替代。

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== ssr 配置 ==========

    // 默认：不生成 SSR 构建
    // ssr: false,

    // 启用 SSR 构建（需要通过 rolldownOptions.input 指定入口）
    // ssr: true,

    // 直接指定 SSR 入口
    ssr: 'src/entry-server.ts',

    // ========== emitAssets 配置 ==========

    // 默认：非客户端构建不输出静态资源
    // emitAssets: false,

    // 强制在 SSR 构建中也输出静态资源
    // 框架需要在构建后步骤中将这些资源合并
    emitAssets: true,

    // ========== 已废弃选项 ==========

    // build.ssrEmitAssets 已弃用，将使用 build.emitAssets 替代
    // ssrEmitAssets: true,  // ❌ 已弃用
    // emitAssets: true,     // ✅ 新写法

    // ========== 实际场景示例 ==========

    // 场景一：SSR 应用的客户端构建
    // build: {
    //   outDir: 'dist/client',
    //   manifest: true,
    //   ssr: false,
    // },

    // 场景二：SSR 应用的服务端构建
    // build: {
    //   outDir: 'dist/server',
    //   ssr: 'src/entry-server.ts',
    //   emitAssets: true,
    //   ssrManifest: true,
    // },

    // 场景三：同时构建客户端和服务端（通过脚本分两步执行）
    // 步骤 1：vite build（客户端构建）
    // 步骤 2：vite build --ssr src/entry-server.ts（SSR 构建）
  },
})
