import { defineConfig } from 'vite'

// 演示：publicDir 使用
// publicDir 中的文件会被原样拷贝到 build 输出目录的根部，url 直接以 / 开头访问
// 适合：robots.txt、favicon、不需要构建处理的 PDF / 视频 / 第三方 JS 等
export default defineConfig({
  root: '.',
  base: '/',

  // 默认值就是 'public'，这里显式声明以演示
  publicDir: 'public',

  server: { port: 5173, open: true },

  build: {
    outDir: 'dist',
  },
})
