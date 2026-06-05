// optimizeDeps.entries：自定义预构建的入口文件
//
// 类型：string | string[]
// 默认行为：Vite 会抓取 index.html 来检测需要预构建的依赖项
//   - 忽略 node_modules、build.outDir、__tests__ 和 coverage 目录
//   - 如果指定了 build.rolldownOptions.input，Vite 将转而去抓取这些入口点
//
// 当默认行为不满足需求时，可以使用此选项指定自定义入口
// 该值遵循 tinyglobby 模式，或为相对于项目根目录的匹配模式数组
// 显式声明 entries 时，默认只有 node_modules 和 build.outDir 会被忽略
// 如需忽略其他文件夹，使用 ! 前缀的忽略模式
// 对于明确包含 node_modules 字符串的模式，不会忽略 node_modules

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== entries 配置 ==========

    // 默认行为：自动抓取 index.html
    // entries: undefined,

    // 单个 glob 模式：指定所有 HTML 文件作为入口
    entries: '**/*.html',

    // 数组形式：指定多个匹配模式
    // entries: [
    //   'index.html',
    //   'src/**/*.html',
    // ],

    // 使用 ! 前缀忽略特定目录（显式声明 entries 时）
    // entries: [
    //   'src/**/*.html',        // 匹配 src 下所有 HTML 文件
    //   '!src/test/**',         // 忽略 src/test 目录
    // ],

    // 明确包含 node_modules 的模式不会被忽略
    // entries: [
    //   'node_modules/my-lib/index.js',  // 不会被自动忽略
    // ],

    // ========== 实际场景示例 ==========

    // 场景一：多页面应用，使用多个 HTML 入口
    // entries: [
    //   'index.html',
    //   'admin.html',
    //   'mobile.html',
    // ],

    // 场景二：自定义源码目录结构（非默认 src 目录）
    // entries: 'app/**/*.html',

    // 场景三：排除测试和文档目录
    // entries: [
    //   'src/**/*.html',
    //   '!src/__tests__/**',
    //   '!src/stories/**',
    // ],
  },
})
