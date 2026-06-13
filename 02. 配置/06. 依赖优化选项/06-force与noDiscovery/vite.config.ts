// optimizeDeps.force：强制依赖预构建
// optimizeDeps.noDiscovery：禁用自动依赖发现
//
// optimizeDeps.force
//   类型：boolean
//   默认：false
//   设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖
//   适用于依赖更新后缓存未生效的情况
//
// optimizeDeps.noDiscovery
//   类型：boolean
//   默认：false
//   设置为 true 时，自动依赖发现将被禁用
//   仅优化 optimizeDeps.include 中列出的依赖项
//   在开发过程中，仅 CJS 依赖项必须存在于 optimizeDeps.include 中

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== force 配置 ==========

    // 默认：false — 使用缓存中已优化的依赖
    // force: false,

    // 强制重新预构建，忽略已有缓存
    // 适用于：依赖更新后缓存未生效、调试预构建问题
    force: true,

    // ========== noDiscovery 配置 ==========

    // 默认：false — 自动发现并优化所有依赖
    // noDiscovery: false,

    // 禁用自动发现，仅优化 include 中列出的依赖
    // 适用于：精确控制哪些依赖被优化、减少预构建时间
    // noDiscovery: true,

    // ========== 实际场景示例 ==========

    // 场景一：依赖更新后缓存失效
    // 当你更新了 node_modules 中的包但 Vite 仍使用旧缓存时
    // force: true,

    // 场景二：精确控制预构建范围
    // noDiscovery: true,
    // include: [
    //   'react',
    //   'react-dom',
    //   'lodash',
    // ],

    // 场景三：仅预构建 CJS 依赖
    // noDiscovery: true,
    // include: [
    //   'some-cjs-package',  // 仅 CJS 依赖必须出现在 include 中
    // ],

    // 场景四：组合使用 — 强制重新优化指定依赖
    // force: true,
    // noDiscovery: true,
    // include: ['react', 'react-dom', 'axios'],
  },
})
