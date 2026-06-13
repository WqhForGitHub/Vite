import { defineConfig } from 'vite'

// HMR (Hot Module Replacement) 在 Vite 中默认开启，无需任何配置
// 修改 .css / 已 accept 的 .js 模块，会“热更新”而非整页刷新
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    hmr: {
      // 默认 true，false 则关闭 HMR
      // overlay: 出错时是否显示页面遮罩
      overlay: true,
    },
  },
})
