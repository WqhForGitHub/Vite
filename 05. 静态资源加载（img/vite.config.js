import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },

  // public 目录（这里的文件不会被打包，会被原样复制到 outDir 根）
  publicDir: 'public',

  build: {
    outDir: 'dist',

    // 资源处理相关
    assetsDir: 'assets', // 打包后资源放在 dist/assets/ 下
    assetsInlineLimit: 4096, // < 4KB 的资源转 base64 内联（默认 4096）
    sourcemap: true,
  },
})
