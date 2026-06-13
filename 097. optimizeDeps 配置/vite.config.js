import { defineConfig } from 'vite'

// optimizeDeps 详细配置 demo
// 文档: https://vitejs.dev/config/dep-optimization-options.html
export default defineConfig({
  optimizeDeps: {
    // 显式纳入预构建（解决一些包不能被自动发现的情况）
    include: [
      'lodash-es',
      'dayjs',
      // 子路径
      'lodash-es/throttle',
    ],

    // 排除：不参与预构建
    exclude: ['some-esm-only-pkg'],

    // 是否每次启动都重建（默认根据 lock 文件 hash 决定）
    force: false,

    // 自定义 esbuild 选项
    esbuildOptions: {
      target: 'es2020',
      define: {
        global: 'globalThis',
      },
      plugins: [
        // 自定义 esbuild 插件用于预构建阶段
      ],
      loader: {
        '.js': 'js',
      },
    },

    // 是否禁用预构建（一般不要禁用）
    disabled: false,

    // 不会被自动 ESM 化的扩展
    extensions: ['.js', '.ts', '.mjs'],
  },

  server: {
    port: 5197,
    open: true,
  },
})
