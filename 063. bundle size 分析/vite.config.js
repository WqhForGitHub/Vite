import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// bundle size 分析 demo
// 使用 rollup-plugin-visualizer 在构建后生成可视化报告
// 构建完成后会自动打开 stats.html，查看每个模块占的体积
export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html', // 输出报告路径
      open: true, // 构建后自动打开
      gzipSize: true, // 显示 gzip 后大小
      brotliSize: true, // 显示 brotli 后大小
      template: 'treemap', // 'treemap' | 'sunburst' | 'network'
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true, // 开启 sourcemap 让分析更精确
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash-es'],
        },
      },
    },
  },
})
