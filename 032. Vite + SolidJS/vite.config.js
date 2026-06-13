import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// 演示：Vite + SolidJS
// SolidJS 编译时优化，运行时极小，使用 vite-plugin-solid
export default defineConfig({
  plugins: [solid()],
  server: { port: 5173, open: true },
})
