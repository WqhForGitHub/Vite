import { defineConfig } from 'vite'

// modulepreload / preload 优化 demo
// Vite 在 build 时会自动给异步 chunk 注入 <link rel="modulepreload"> 减少瀑布加载
// 通过 build.modulePreload 可调整策略
export default defineConfig({
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    // modulepreload 配置
    modulePreload: {
      // false 关闭；true 默认
      polyfill: true,
      // 自定义需要 preload 的依赖
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        // 只 preload 同名的 css 与 chunk，过滤极小文件可省 head 体积
        return deps.filter((d) => !d.includes('rarely-used'))
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },

  server: {
    port: 5112,
    open: true,
  },
})
