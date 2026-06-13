import { defineConfig } from 'vite'

// HMR 边界 (HMR Boundary)：
//   一个模块若未调用 import.meta.hot.accept，则其更新会“冒泡”到导入它的模块，
//   直到遇到第一个 accept 它的祖先（即“边界”）；如果一路冒泡到入口仍无人 accept，则整页刷新
export default defineConfig({
  server: { port: 5173, open: true },
})
