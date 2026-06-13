import { defineConfig } from 'vite'

// 多主题切换 demo
export default defineConfig({
  root: '.',
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5174,
    open: true,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015',
    cssCodeSplit: true,
  },
  preview: {
    port: 4174,
  },
})
