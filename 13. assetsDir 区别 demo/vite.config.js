import { defineConfig } from 'vite'

// assetsDir：构建产物中静态资源（图片、字体、被分包的 JS/CSS）相对 outDir 的存放目录
//   默认是 'assets'，所以最终文件路径是 dist/assets/xxx-hash.ext
// 与 publicDir 的区别：
//   - publicDir：源码中“原样输出”的目录（不进入构建管线）
//   - assetsDir：构建管线“产物”所在子目录
// 与 build.assetsInlineLimit：小于该字节数的资源会被内联为 base64，不会出现在 assetsDir 中
export default defineConfig({
  build: {
    outDir: 'dist',
    // 改成 'static' 试试，构建产物会变成 dist/static/...
    assetsDir: 'static',
    // 默认 4096，小于这个的资源会被内联
    assetsInlineLimit: 4096,
    sourcemap: true,
  },
  server: { port: 5173, open: true },
})
