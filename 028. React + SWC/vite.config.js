import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// 演示：React + SWC
// 使用 @vitejs/plugin-react-swc 替代官方默认的 @vitejs/plugin-react
// SWC 由 Rust 编写，相比 Babel 编译速度更快，HMR 体验更好
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
