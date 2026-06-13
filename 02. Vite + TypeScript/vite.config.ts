import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// Vite 在 .ts 配置中也能直接使用类型提示
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },

  // 路径别名（@ 指向 src）
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020',
  },

  // esbuild 选项 —— Vite 用 esbuild 转译 TS（不做类型检查）
  esbuild: {
    target: 'es2020',
    // 生产环境移除 console / debugger（不想要可以删掉这一行）
    drop: ['console', 'debugger'],
  },
})
