// 用于对照：rsbuild.config.mjs (执行 npm run dev:rsbuild 触发)
import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: { index: './src/main.js' },
  },
  html: {
    template: './index.html',
  },
  output: {
    distPath: { root: 'dist-rsbuild' },
  },
  server: {
    port: 5214,
  },
})
