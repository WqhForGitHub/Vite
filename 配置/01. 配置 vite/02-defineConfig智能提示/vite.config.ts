// 使用 defineConfig 工具函数获取类型提示
// 不需要 jsdoc 注解也能获得完整的 IDE 智能提示
import { defineConfig } from 'vite'

export default defineConfig({
  // 在这里输入会有完整的类型提示和自动补全
  root: '.',
  server: {
    port: 5173,
    host: true, // 监听所有地址，包括局域网和公网地址
  },
  build: {
    outDir: 'dist', // 打包输出目录
    sourcemap: true, // 构建后是否生成 source map 文件
  },
})
