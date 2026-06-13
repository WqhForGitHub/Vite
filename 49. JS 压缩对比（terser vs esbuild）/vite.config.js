import { defineConfig } from 'vite'

// JS 压缩对比 demo
// 通过环境变量切换 minify 方式
// MINIFY=terser npm run build  -> 使用 terser
// MINIFY=esbuild npm run build -> 使用 esbuild（默认更快）
// MINIFY=false  npm run build  -> 不压缩
const minify = process.env.MINIFY || 'esbuild'

export default defineConfig({
  build: {
    // esbuild: 默认，速度快，压缩比稍逊
    // terser: 速度慢，压缩比更高，可配置更多选项
    // false: 不压缩
    minify: minify === 'false' ? false : minify,
    // 仅 terser 生效
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    // 输出到不同目录便于对比
    outDir: `dist-${minify}`,
  },
})
