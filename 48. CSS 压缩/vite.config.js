import { defineConfig } from 'vite'

// CSS 压缩 demo
// 默认 cssMinify: true（使用 esbuild 压缩 CSS）
export default defineConfig({
  build: {
    // 可选 'esbuild' | 'lightningcss' | true | false
    cssMinify: 'esbuild',
    // 若使用 lightningcss，需要安装 lightningcss
    // cssMinify: 'lightningcss',
    minify: 'esbuild',
  },
  css: {
    devSourcemap: false,
  },
})
