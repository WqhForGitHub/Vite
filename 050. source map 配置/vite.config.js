import { defineConfig } from 'vite'

// source map 配置 demo
// 可选值：
// false              不生成 sourcemap
// true               生成独立 .map 文件
// 'inline'           内联到产物中（base64）
// 'hidden'           生成 .map 但产物不引用（错误监控可用）
export default defineConfig({
  build: {
    sourcemap: true,
  },
})
