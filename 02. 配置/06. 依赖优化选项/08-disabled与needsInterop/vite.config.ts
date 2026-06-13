// optimizeDeps.disabled：已废弃
// optimizeDeps.needsInterop：强制 ESM 转换
//
// optimizeDeps.disabled（已废弃）
//   类型：boolean | 'build' | 'dev'
//   默认：'build'
//   此选项已被弃用。从 Vite 5.1 起，构建过程中的依赖预打包已被移除
//   设置为 true 或 'dev' 将禁用优化器
//   设置为 false 或 'build' 将在开发模式下启用优化器
//
//   完全禁用优化器的替代方案：
//     optimizeDeps.noDiscovery: true  +  optimizeDeps.include 不定义或为空
//
// optimizeDeps.needsInterop（实验性）
//   类型：string[]
//   当导入这些依赖项时，会强制 ESM 转换
//   Vite 能正确检测依赖是否需要 interop，通常不需要手动配置
//   但不同依赖组合可能导致某些包以不同方式预构建
//   将这些包添加到 needsInterop 中可避免重新加载页面，加快冷启动
//   如果某个依赖符合此情况，Vite 会抛出警告并建议添加该包名

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== disabled 配置（已废弃）==========

    // ❌ 已废弃：此选项不再推荐使用
    // disabled: 'build',   // 默认值：构建时禁用，开发时启用
    // disabled: true,      // 完全禁用优化器
    // disabled: 'dev',     // 开发时也禁用优化器
    // disabled: false,     // 开发时启用优化器

    // ✅ 完全禁用优化器的替代方案
    // noDiscovery: true,
    // include: [],         // 不定义或为空

    // ========== needsInterop 配置（实验性）==========

    // 默认：不需要手动配置，Vite 会自动检测
    // needsInterop: [],

    // 手动指定需要 interop 的依赖（Vite 警告时会建议添加）
    // needsInterop: ['some-package'],

    // 多个需要 interop 的包
    // needsInterop: [
    //   'package-a',       // Vite 检测到需要 interop 的包
    //   'package-b',       // 不同依赖组合导致需要 interop
    // ],

    // ========== 实际场景示例 ==========

    // 场景一：Vite 提示某包需要 interop
    // 当冷启动时 Vite 输出警告：
    //   "The following dependencies need interop: some-package"
    // 按提示添加到 needsInterop 即可避免下次冷启动时重新加载
    // needsInterop: ['some-package'],

    // 场景二：组合依赖导致预构建方式不一致
    // 当同一包在不同依赖组合下被以不同方式预构建时
    // needsInterop: [
    //   'react-dnd',        // 依赖组合导致需要 interop
    //   'react-dnd-html5-backend',
    // ],

    // 场景三：完全禁用优化器（disabled 的替代方案）
    // noDiscovery: true,
    // include: [],
  },
})
