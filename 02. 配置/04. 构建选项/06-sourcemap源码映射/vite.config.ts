// build.sourcemap：source map 文件生成配置
//
// 类型：boolean | 'inline' | 'hidden'
// 默认：false
//
// 构建后是否生成 source map 文件。
// - true：创建一个独立的 source map 文件（.map 文件）
// - 'inline'：source map 将作为一个 data URI 附加在输出文件中
// - 'hidden'：工作原理与 true 相似，只是 bundle 文件中相应的注释将不被保留
//
// 用途：
// - 调试生产环境的代码问题
// - 错误监控工具（如 Sentry）需要 source map 来还原压缩后的错误堆栈
// - 'hidden' 适合不想暴露 source map 给用户但又需要在错误监控平台使用的场景

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== sourcemap 配置 ==========

    // 默认：不生成 source map
    // sourcemap: false,

    // 生成独立的 source map 文件
    // 构建产物会包含 .js.map 文件，JS 文件底部会有 sourceMappingURL 注释
    sourcemap: true,

    // source map 内联到输出文件中
    // 不会生成独立的 .map 文件，而是在 JS 文件中包含 data URI
    // 适合小型项目或不想管理额外文件的场景
    // 缺点：会显著增大 JS 文件体积
    // sourcemap: 'inline',

    // 隐藏模式的 source map
    // 生成独立的 .map 文件，但 JS 文件中不包含 sourceMappingURL 注释
    // 适合需要在错误监控平台使用 source map，但不想让用户
    // 在浏览器 DevTools 中直接看到源码的场景
    // sourcemap: 'hidden',

    // ========== 实际场景示例 ==========

    // 场景一：开发阶段调试，生成独立 source map
    // sourcemap: true,

    // 场景二：生产环境配合 Sentry 等错误监控
    // 使用 hidden 模式，上传 source map 到监控平台后删除
    // sourcemap: 'hidden',

    // 场景三：CI/CD 中生成 source map 并上传到监控服务
    // 构建后通过脚本上传 .map 文件，然后从产物中删除
    // sourcemap: true,
  },
});
