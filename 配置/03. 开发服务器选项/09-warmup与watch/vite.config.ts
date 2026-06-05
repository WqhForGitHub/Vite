// warmup 与 watch：预热缓存与文件监听配置
//
// warmup：提前转换和缓存文件以进行预热
//   类型：{ clientFiles?: string[], ssrFiles?: string[] }
//   可以在服务器启动时提高初始页面加载速度，并防止转换瀑布
//   clientFiles 是仅在客户端使用的文件
//   ssrFiles 是仅在服务端渲染中使用的文件
//   它们接受相对于 root 的文件路径数组或 tinyglobby 模式
//   确保只添加经常使用的文件，以免启动时过载 Vite 开发服务器
//
// watch：文件系统监视器选项传递给 chokidar
//   类型：object | null
//   默认监听 root 目录，跳过 .git/、node_modules/、test-results/、cacheDir 和 outDir
//   设为 null 则不监视任何文件
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // ========== warmup 配置 ==========

    warmup: {
      // 仅在客户端使用的文件
      // 支持文件路径数组或 tinyglobby 模式
      // 请确保只添加项目中实际存在的文件，以免启动时报错
      clientFiles: [
        // './src/components/*.vue',
        // './src/utils/big-utils.js',
        // './src/main.ts',
      ],

      // 仅在服务端渲染中使用的文件
      ssrFiles: [
        // './src/server/modules/*.js',
      ],
    },

    // ========== watch 配置 ==========

    // 传递给 chokidar 的选项
    watch: {
      // 在 WSL2 上运行 Vite 时，如果项目文件夹位于 Windows 文件系统中
      // 需要设置 usePolling: true（注意：会导致高 CPU 占用率）
      // 推荐做法：使用 WSL2 应用来编辑文件，并将项目移出 Windows 文件系统
      // usePolling: true,

      // 忽略特定文件或目录
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],

      // 使用轮询间隔（毫秒），仅在 usePolling 为 true 时有效
      // interval: 100,
    },

    // ========== 禁用文件监听 ==========
    // 设为 null 则不监视任何文件
    // server.watcher 将提供兼容的事件发射器，
    // 但调用 add 或 unwatch 将不起作用
    // watch: null,
  },
})
