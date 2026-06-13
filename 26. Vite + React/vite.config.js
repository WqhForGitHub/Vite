import { defineConfig } from 'vite'

// 演示：热更新（HMR）基础
// Vite 默认开启 HMR，CSS 改动会立即热替换；JS 模块需要在代码中调用
// import.meta.hot.accept(...) 显式声明热更新边界
export default defineConfig({
  root: '.',
  base: '/',
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: true, // 错误时浮层提示
    },
  },
})
