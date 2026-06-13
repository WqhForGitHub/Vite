import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'

// 演示：Vite + Qwik
// Qwik 提供"可恢复性 (Resumability)"，组件惰性加载，启动极快
// 使用 @builder.io/qwik/optimizer 中的 qwikVite 插件
export default defineConfig({
  plugins: [qwikVite()],
  server: { port: 5173, open: true },
})
