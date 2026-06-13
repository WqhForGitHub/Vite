import { defineConfig } from 'vite'

// build target 配置 demo
// 切换 TARGET 环境变量来对比：
// TARGET=esnext  -> 保留最新语法（更小、需现代浏览器）
// TARGET=es2015  -> 转译至 ES2015（兼容旧浏览器）
const target = process.env.TARGET || 'esnext'

export default defineConfig({
  build: {
    // 'modules' (默认: 支持原生 ESM 浏览器)
    // 'esnext' / 'es2015' / 'es2017' / ['es2020', 'chrome80'] 等
    target,
    outDir: `dist-${target}`,
    minify: false, // 关闭压缩便于查看产物语法差异
  },
})
