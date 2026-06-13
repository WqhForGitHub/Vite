import { defineConfig } from 'vite'

// vite vs rsbuild 对比 demo（vite 端）
// rsbuild = 字节出品的基于 rspack(rust) 的开箱即用打包方案
// 同源码下对比：dev 启动、HMR、build 耗时与体积
export default defineConfig({
  plugins: [
    {
      name: 'vite-bench',
      configureServer(server) {
        const t0 = Date.now()
        server.httpServer?.once('listening', () => {
          console.log(`[vite] dev ready in ${Date.now() - t0}ms`)
        })
      },
    },
  ],
  server: {
    port: 5114,
    open: true,
  },
  build: {
    outDir: 'dist-vite',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
