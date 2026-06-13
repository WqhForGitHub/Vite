import { defineConfig } from 'vite'

// 构建性能对比 demo —— Vite 配置
// 与同目录下 webpack.config.cjs 保持等价的入口/输出
// 通过 scripts/compare.js 对比 build 耗时
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist-vite',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: 'index.html',
    },
  },
})
