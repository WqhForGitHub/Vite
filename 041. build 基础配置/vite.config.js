import { defineConfig } from 'vite'

// build 基础配置 demo
export default defineConfig({
  build: {
    // 构建产物输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    // 小于该值的资源转 base64 内联
    assetsInlineLimit: 4096,
    // 启用 CSS 代码拆分
    cssCodeSplit: true,
    // 是否生成 sourcemap
    sourcemap: false,
    // 压缩方式：'terser' | 'esbuild' | false
    minify: 'esbuild',
    // 构建时清空输出目录
    emptyOutDir: true,
    // chunk 大小警告阈值（KB）
    chunkSizeWarningLimit: 500,
    // 是否生成 manifest.json
    manifest: false,
    // 报告压缩详细信息
    reportCompressedSize: true,
  },
})
