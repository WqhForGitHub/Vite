// build.target：设置构建的浏览器兼容性目标，控制转译程度
//
// 类型：string | string[]
// 默认：'baseline-widely-available'
//
// 最终软件包的浏览器兼容性目标。默认值是 Vite 的一个特殊值
// 'baseline-widely-available'，该值针对的是包含在 2026 年 1 月 1 日
// 广泛可用的 Baseline 中的浏览器。具体来说，它是：
//   ['chrome111', 'edge111', 'firefox114', 'safari16.4']
//
// 另一个特殊值是 'esnext' —— 即假设有原生动态导入支持，
// 并只执行最低限度的转译。
//
// 转换过程将会由 Oxc Transformer 执行，并且此值应该是一个合法的
// Oxc Transformer 目标选项。自定义目标也可以是一个 ES 版本
// （例如：es2015）、一个浏览器版本（例如：chrome58）或是多个目标
// 组成的一个数组。
//
// 注意：如果代码包含不能被 Oxc 安全地编译的特性，那么构建将会
// 输出警告。

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== target 配置 ==========

    // 默认值：针对广泛可用的 Baseline 浏览器
    // 等同于 ['chrome111', 'edge111', 'firefox114', 'safari16.4']
    // target: 'baseline-widely-available',

    // 最低限度的转译，假设原生支持所有现代特性
    // 适合只面向现代浏览器的应用
    target: "esnext",

    // 指定单个 ES 版本 —— 输出兼容 ES2015 的代码
    // target: 'es2015',

    // 指定单个浏览器版本
    // target: 'chrome58',

    // 指定多个目标组成的数组
    // target: ['es2020', 'chrome58', 'firefox57', 'safari11', 'edge16'],

    // ========== 实际场景示例 ==========

    // 场景一：企业内部应用，所有用户都使用最新版 Chrome
    // target: 'esnext',
    // 这样构建产物最小，转译最少，性能最优

    // 场景二：需要兼容较老的浏览器
    // target: ['es2015', 'safari10'],
    // 输出会被更多转译，但兼容更多环境

    // 场景三：针对 Node.js 环境（如 SSR）
    // target: 'node18',
    // 注意：需要确保 Oxc Transformer 支持该目标
  },
});
