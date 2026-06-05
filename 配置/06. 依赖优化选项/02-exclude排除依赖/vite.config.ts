// optimizeDeps.exclude：在预构建中强制排除的依赖项
//
// 类型：string[]
// 默认：无（不排除任何依赖）
//
// 注意事项：
//   - CommonJS 依赖不应该排除在优化外，否则可能导致运行时错误
//   - 如果一个 ESM 依赖被排除，但其嵌套了 CommonJS 依赖，
//     则应该为该 CommonJS 依赖添加 optimizeDeps.include
//   - 被排除的依赖将以原生 ESM 形式提供，这可能导致性能问题
//
// 典型用例：
//   - 排除仅在生产环境使用的大型库
//   - 排除有副作用的库（如 CSS-in-JS）
//   - 排除已经提供 ESM 格式的本地链接包

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== exclude 配置 ==========

    // 排除单个依赖
    exclude: ['lodash-es'],

    // 排除多个依赖
    // exclude: [
    //   'lodash-es',       // 已经是 ESM 格式，不需要预构建
    //   '@iconify/vue',    // 大型图标库，按需加载更高效
    // ],

    // ⚠️ 错误示例：不要排除 CommonJS 依赖
    // exclude: ['some-cjs-package'],  // ❌ CommonJS 包被排除会导致运行时错误

    // ========== 实际场景示例 ==========

    // 场景一：排除已提供 ESM 格式的库
    // exclude: [
    //   'lodash-es',
    //   'ms',
    //   'date-fns',
    // ],

    // 场景二：排除大型库（仅在生产环境使用）
    // exclude: [
    //   'monaco-editor',     // 代码编辑器，体积巨大
    //   'html2canvas',       // 截图库，开发时不需要
    // ],

    // 场景三：ESM 依赖排除但嵌套 CJS 依赖需 include
    // 排除 esm-dep 后，其内部的 cjs-dep 需要手动 include
    // exclude: ['esm-dep'],
    // include: ['esm-dep > cjs-dep'],
  },
})
