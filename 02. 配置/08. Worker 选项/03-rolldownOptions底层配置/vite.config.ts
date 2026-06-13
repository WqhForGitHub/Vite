// worker.rolldownOptions / worker.rollupOptions
// 用于打包 Worker 的 Rolldown 配置项
//
// worker.rolldownOptions
//   类型：RolldownOptions
//   用于打包 worker 的 Rolldown 配置项。
//   这与从 Rolldown 配置文件导出的选项相同，
//   并将与 Vite 的内部 Worker Rolldown 选项合并。
//   更多详情请参阅 Rolldown 选项文档。
//
// worker.rollupOptions（已弃用）
//   类型：RolldownOptions
//   此选项是 worker.rolldownOptions 选项的别名。
//   请使用 worker.rolldownOptions 选项代替。

import { defineConfig } from 'vite'

export default defineConfig({
  worker: {
    // ========== rolldownOptions 配置 ==========

    rolldownOptions: {
      // 输出配置
      output: {
        // 入口文件命名
        entryFileNames: 'workers/[name]-[hash].js',

        // chunk 文件命名
        chunkFileNames: 'workers/chunks/[name]-[hash].js',

        // 静态资源文件命名
        assetFileNames: 'workers/assets/[name]-[hash].[ext]',
      },

      // 外部化依赖（不打包进 Worker bundle）
      // external: ['some-heavy-lib'],

      // 自定义 chunk 分割策略
      // output: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return 'worker-vendor'
      //     }
      //   },
      // },
    },

    // ========== 已废弃选项 ==========

    // worker.rollupOptions 是 worker.rolldownOptions 的别名
    // rollupOptions: { ... },  // ❌ 已弃用
    // rolldownOptions: { ... },  // ✅ 新写法

    // ========== 实际场景示例 ==========

    // 场景一：优化 Worker 输出文件结构
    // 将所有 Worker 输出到统一目录，便于管理和部署
    // rolldownOptions: {
    //   output: {
    //     entryFileNames: 'workers/[name].js',
    //     chunkFileNames: 'workers/chunks/[name].js',
    //     assetFileNames: 'workers/assets/[name].[ext]',
    //   },
    // },

    // 场景二：外部化大型依赖
    // 当 Worker 中使用了大型库但可以通过 CDN 或其他方式加载时
    // rolldownOptions: {
    //   external: ['lodash', 'axios'],
    //   output: {
    //     globals: {
    //       lodash: '_',
    //       axios: 'axios',
    //     },
    //   },
    // },

    // 场景三：精细控制 Worker chunk 分割
    // 适合多个 Worker 共享依赖的场景
    // rolldownOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         if (id.includes('shared-lib')) return 'worker-shared'
    //         return 'worker-vendor'
    //       }
    //     },
    //   },
    // },

    // ========== 注意事项 ==========

    // 1. worker.rolldownOptions 与 build.rolldownOptions 是独立的，
    //    前者仅影响 Worker 的打包，后者影响主应用的打包
    // 2. 配置会与 Vite 内部的 Worker Rolldown 选项合并，
    //    相同的键会覆盖 Vite 的默认值
    // 3. worker.rollupOptions 已弃用，请使用 worker.rolldownOptions
  },
})
