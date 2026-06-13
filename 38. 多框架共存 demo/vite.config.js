import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

// 演示：多框架共存
// 同一个 Vite 应用中同时使用 Vue 与 React
// 通过同时注册两个插件实现
export default defineConfig({
  plugins: [
    vue(),
    react({
      // 仅对 jsx/tsx 文件应用 react 插件，避免与 Vue SFC 冲突
      include: /\.(jsx|tsx)$/,
    }),
  ],
  server: { port: 5173, open: true },
})
