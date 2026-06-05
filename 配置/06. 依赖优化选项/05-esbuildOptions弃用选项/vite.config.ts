// optimizeDeps.esbuildOptions：已弃用
//
// 类型：Omit<EsbuildBuildOptions,
//   'bundle' | 'entryPoints' | 'external' | 'write' | 'watch' |
//   'outdir' | 'outfile' | 'outbase' | 'outExtension' | 'metafile'>
//
// ⚠️ 已弃用：此选项在内部被转换为 optimizeDeps.rolldownOptions
// 请使用 optimizeDeps.rolldownOptions 代替
//
// 历史用途：
//   - 在 Vite 6 之前，依赖预构建使用 esbuild
//   - 此选项用于传递 esbuild 构建选项
//   - 现在依赖预构建使用 Rolldown，请迁移至 rolldownOptions

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== esbuildOptions 配置（已弃用）==========

    // ❌ 旧写法（已弃用）
    // esbuildOptions: {
    //   target: 'esnext',
    //   define: {
    //     'process.env.NODE_ENV': '"development"',
    //   },
    //   plugins: [
    //     // 自定义 esbuild 插件
    //   ],
    // },

    // ✅ 新写法：使用 rolldownOptions
    rolldownOptions: {
      output: {
        // 自定义输出选项
      },
    },

    // ========== 迁移指南 ==========
    //
    // esbuildOptions.target → rolldownOptions.target
    // esbuildOptions.define → rolldownOptions.define
    // esbuildOptions.plugins → rolldownOptions.plugins
    // esbuildOptions.banner → 不再支持（banner 由 Vite 管理）
    //
    // 注意：rolldownOptions 中某些选项被省略
    // 因为修改它们与 Vite 的优化方案不兼容
    // 省略的选项：input、logLevel、output.format、output.sourcemap、output.dir、output.banner

    // ========== 实际场景示例 ==========

    // 场景一：定义全局变量（旧 → 新）
    // ❌ esbuildOptions: { define: { 'process.env.CUSTOM': '"value"' } }
    // ✅ rolldownOptions: { define: { 'process.env.CUSTOM': '"value"' } }

    // 场景二：自定义插件（旧 → 新）
    // ❌ esbuildOptions: { plugins: [esbuildPlugin()] }
    // ✅ rolldownOptions: { plugins: [rolldownPlugin()] }
  },
})
