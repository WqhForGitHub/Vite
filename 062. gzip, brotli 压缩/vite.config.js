import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'

// gzip / brotli 压缩 demo
// 通过 vite-plugin-compression 在构建后生成 .gz 与 .br 文件
// 配合服务端（nginx 等）配置，实现静态资源压缩传输
export default defineConfig({
  plugins: [
    // gzip 压缩
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // 大于 1KB 的资源才压缩
      deleteOriginFile: false, // 是否删除源文件
    }),
    // brotli 压缩
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  build: {
    outDir: 'dist',
    // 报告压缩后的大小（gzip 内置统计）
    reportCompressedSize: true,
  },
})
