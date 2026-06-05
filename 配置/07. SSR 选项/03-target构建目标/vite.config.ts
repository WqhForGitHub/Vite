// ssr.target：SSR 服务器的构建目标
//
// 类型：'node' | 'webworker'
// 默认值：'node'
//
// SSR 服务器的构建目标，决定构建输出的运行环境：
// - 'node'：生成在 Node.js 环境中运行的代码（默认）
// - 'webworker'：生成在 Web Worker 环境中运行的代码（如 Cloudflare Workers）
//
// 当 ssr.target 为 'node' 时，Node.js 的内置模块会被默认外部化。
// 当 ssr.target 为 'webworker' 时，需要配合 ssr.noExternal 使用来打包所有依赖。

import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    // ========== target 基础配置 ==========

    // 默认：构建目标为 Node.js
    target: 'node',

    // 构建目标为 Web Worker（如 Cloudflare Workers、Deno Deploy 等）
    // target: 'webworker',

    // ========== 与其他 SSR 选项配合使用 ==========

    // 场景一：Node.js 环境（默认配置）
    // ssr: {
    //   target: 'node',
    //   // Node.js 内置模块会被默认外部化
    //   // 如 fs、path、http 等不会被打包进构建产物
    // },

    // 场景二：Web Worker 环境
    // ssr: {
    //   target: 'webworker',
    //   noExternal: true,  // Web Worker 环境需要打包所有依赖
    //   // Node.js 内置模块不会被外部化
    // },

    // ========== 实际场景示例 ==========

    // 场景一：传统 Node.js SSR 服务器
    // target: 'node',

    // 场景二：Cloudflare Workers SSR
    // target: 'webworker',

    // 场景三：Vercel Edge Functions
    // target: 'webworker',

    // 场景四：Deno Deploy
    // target: 'webworker',
  },
})
