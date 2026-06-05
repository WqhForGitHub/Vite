// optimizeDeps.include：强制预构建链接的包
//
// 类型：string[]
// 默认：无（不在 node_modules 中的链接包不会被预构建）
//
// 用途：
//   - 默认情况下，不在 node_modules 中的链接包（如 yarn/npm link 的包）不会被预构建
//   - 使用此选项可强制预构建链接的包
//   - 当 ESM 依赖被排除但嵌套了 CommonJS 依赖时，应为此 CJS 依赖添加 include
//
// 实验性功能（尾部 glob 模式）：
//   - 对于有很多深层导入的库，可以指定尾部的 glob 模式一次性预构建所有深层导入
//   - 避免在使用新的深层导入时不断触发预构建
//   - 例如：'my-lib/components/**/*.vue'

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== include 配置 ==========

    // 强制预构建链接的包
    include: ['my-linked-package'],

    // 多个链接包
    // include: [
    //   'my-ui-lib',        // 本地链接的 UI 组件库
    //   'my-utils-lib',     // 本地链接的工具库
    // ],

    // ESM 依赖被排除时，嵌套的 CJS 依赖需要 include
    // include: ['esm-dep > cjs-dep'],

    // ========== 实验性：尾部 glob 模式 ==========

    // 使用 glob 模式一次性预构建所有深层导入
    // include: [
    //   'my-lib/components/**/*.vue',  // 预构建 my-lib 下所有 Vue 组件
    // ],

    // 组合使用：普通包 + glob 模式
    // include: [
    //   'my-linked-package',
    //   'my-lib/components/**/*.vue',
    //   'another-lib/utils/**/*.ts',
    // ],

    // ========== 实际场景示例 ==========

    // 场景一：本地开发 monorepo 中的链接包
    // include: [
    //   '@my-org/shared-utils',   // workspace 中链接的共享工具库
    //   '@my-org/ui-components',  // workspace 中链接的 UI 组件库
    // ],

    // 场景二：排除 ESM 包后补充其 CJS 嵌套依赖
    // exclude: ['esm-dep'],
    // include: ['esm-dep > cjs-dep'],

    // 场景三：大型 UI 库深层导入预构建
    // include: [
    //   'ant-design-vue/es/**/*.js',     // Ant Design Vue 深层导入
    //   'element-plus/es/components/**/*.mjs',  // Element Plus 深层导入
    // ],
  },
})
