import { defineConfig } from 'vite'

// preload, prefetch demo
// Vite 默认会为异步 chunk 注入 modulepreload
export default defineConfig({
  build: {
    // 默认 true，会自动为所有动态 import 的 chunk 注入 modulepreload
    modulePreload: {
      polyfill: true, // 注入 modulepreload polyfill 兼容旧浏览器
      // 自定义需要 preload 的依赖
      resolveDependencies: (filename, deps) => {
        // 仅 preload 入口和必要 chunk，过滤掉懒加载页面
        return deps.filter((d) => !d.includes('lazy-'))
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
})
