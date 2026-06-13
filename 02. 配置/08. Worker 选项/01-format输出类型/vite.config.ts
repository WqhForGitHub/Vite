// worker.format
// Worker 打包时的输出类型
//
// worker.format
//   类型：'es' | 'iife'
//   默认：'iife'
//   Worker 打包时的输出格式。
//   - 'iife'：自执行函数格式，所有代码包裹在一个立即执行函数中，
//     兼容性最好，是默认选项
//   - 'es'：ES 模块格式，输出标准的 ES Module 语法，
//     支持现代浏览器中的 Worker ES 模块加载

import { defineConfig } from 'vite'

export default defineConfig({
  worker: {
    // ========== format 配置 ==========

    // 默认值：'iife' — 自执行函数格式
    format: 'iife',

    // 使用 ES 模块格式输出
    // format: 'es',

    // ========== 实际场景示例 ==========

    // 场景一：现代浏览器中使用 ES 模块 Worker
    // 适合不需要兼容旧浏览器的场景，可利用 ES 模块的静态分析优势
    // worker: {
    //   format: 'es',
    // },

    // 场景二：需要兼容旧浏览器
    // 默认 'iife' 格式兼容性最好，适合需要支持旧版浏览器的场景
    // worker: {
    //   format: 'iife',
    // },

    // ========== 注意事项 ==========

    // 1. 当使用 new Worker('./worker.js', { type: 'module' }) 时，
    //    可以配合 worker.format: 'es' 来输出 ES 模块格式的 Worker
    // 2. iife 格式在所有浏览器中都能正常工作，推荐作为默认选择
    // 3. 该选项同时影响开发（dev）和构建（build）阶段的 Worker 打包输出
  },
})
