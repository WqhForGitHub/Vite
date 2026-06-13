import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

// vite-plugin-compression: 在 build 后生成 .gz / .br 压缩文件
// 文档: https://github.com/vbenjs/vite-plugin-compression
export default defineConfig({
  plugins: [
    // gzip 压缩
    viteCompression({
      verbose: true, // 输出压缩日志
      disable: false, // 是否禁用
      threshold: 1024, // 大于多少字节才压缩（B）
      algorithm: 'gzip', // gzip / brotliCompress / deflate / deflateRaw
      ext: '.gz',
      deleteOriginFile: false, // 是否删除原文件
    }),
    // brotli 压缩（更高压缩比）
    viteCompression({
      verbose: true,
      threshold: 1024,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
  ],

  build: {
    outDir: 'dist',
    sourcemap: false,
    // 让产物大一些以便看到压缩效果
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },

  server: {
    port: 5189,
    open: true,
  },
})
