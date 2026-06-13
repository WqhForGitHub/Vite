import { defineConfig } from 'vite'

// 演示：assetsDir 配置
// build.assetsDir 决定了构建产物中"资产"目录的相对路径（相对 outDir）
// 默认是 'assets'，所有 JS / CSS / 图片等会被打到 dist/assets/ 下
// 这里改成 'static/files' 以演示效果
export default defineConfig({
  root: '.',
  base: '/',
  server: { port: 5173, open: true },

  build: {
    outDir: 'dist',
    assetsDir: 'static/files', // 默认 'assets'
    // 资产内联阈值：小于 4kb 的文件会被转为 base64 直接嵌入
    assetsInlineLimit: 4096,
  },
})
