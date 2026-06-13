import { defineConfig } from 'vite'

// 注意：这里没有写 css.postcss 字段
// Vite 会自动加载根目录下的 postcss.config.js
//
// 如果在这里写了 css.postcss，会覆盖 postcss.config.js
// 例如：
//   import autoprefixer from 'autoprefixer'
//   export default defineConfig({
//     css: {
//       postcss: { plugins: [autoprefixer()] },
//     },
//   })
//
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: true,

    // 是否压缩 CSS（默认 'esbuild'）
    cssMinify: 'esbuild',
  },
})
