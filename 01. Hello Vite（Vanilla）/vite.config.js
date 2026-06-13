import { defineConfig } from 'vite'

// Vite 配置文档：https://vitejs.dev/config/
export default defineConfig({
  // 项目根目录（默认就是 vite.config.js 所在目录）
  root: '.',

  // 部署时的公共基础路径
  base: '/',

  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true, // 启动后自动打开浏览器
    strictPort: false, // 端口被占用时是否退出（false=自动尝试下一个）
  },

  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015',
  },

  // 预览服务器（npm run preview）
  preview: {
    port: 4173,
  },
})
