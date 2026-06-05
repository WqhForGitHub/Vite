// build.watch：构建监听模式
//
// 类型：WatcherOptions | null
// 默认：null
//
// 设置为 {} 则会启用 rollup 的监听器。
// 对于只在构建阶段或者集成流程使用的插件很常用。
//
// 注意：某些情况下 WSL2 的文件系统监听可能无法正常工作。
// 查看 server.watch 了解更多细节。

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== watch 基本配置 ==========

    // 默认：不启用监听
    // watch: null,

    // 启用监听模式（使用默认配置）
    // watch: {},

    // ========== watch 详细配置 ==========

    watch: {
      // 监听的文件路径模式
      // 默认监听所有项目文件
      // include: 'src/**',

      // 排除监听的文件路径模式
      exclude: ['node_modules/**', 'dist/**'],

      // 是否使用轮询（polling）方式监听文件变化
      // 某些文件系统（如 NFS、WSL2）可能需要启用轮询
      // usePolling: true,

      // 轮询间隔（毫秒），仅在 usePolling 为 true 时生效
      // interval: 100,
    },

    // ========== 实际场景示例 ==========

    // 场景一：构建阶段插件开发
    // watch: {},
    // 配合 build.write: true，文件变更时自动重新构建

    // 场景二：集成流程中使用
    // watch: {
    //   include: 'src/**',
    //   exclude: ['src/**/*.test.ts'],
    // },

    // 场景三：WSL2 环境下监听
    // WSL2 的文件系统监听可能无法正常工作，需要使用轮询
    // watch: {
    //   usePolling: true,
    //   interval: 100,
    // },

    // 场景四：配合脚本使用（package.json）
    // "scripts": {
    //   "build:watch": "vite build --watch"
    // }

    // ========== 注意事项 ==========

    // 1. 监听模式仅适用于构建（build），不是开发服务器（dev）
    // 2. 如果需要 HMR 和模块热替换，请使用 vite dev 而不是 build --watch
    // 3. 在 WSL2 上可能需要启用 usePolling
    // 4. 构建监听适合用于：插件开发、后端集成、自动化流程
  },
})
