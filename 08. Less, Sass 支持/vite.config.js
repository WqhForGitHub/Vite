import { defineConfig } from 'vite'

// Vite 内置支持 .less / .scss / .sass，只要安装对应的预处理器即可
// 这里通过 css.preprocessorOptions 给 Less 与 Sass 注入全局变量
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // 启用 JS 表达式（Less 4 默认关闭）
        javascriptEnabled: true,
        // 全局注入 Less 变量
        additionalData: `@global-color: #1677ff;`,
      },
      scss: {
        // 全局注入 Sass 变量
        additionalData: `$global-color: #ff4d4f;`,
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
