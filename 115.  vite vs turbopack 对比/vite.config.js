import { defineConfig } from 'vite'

// vite vs turbopack 对比 demo（vite 端）
// turbopack 是 Vercel 推出的 Rust 实现的打包器，目前主要随 Next.js 提供
// 公平对比方式：分别用 vite / next dev --turbo 运行同一份业务代码
// 这里给出 vite 的实现；turbopack 一侧通过 next 项目对照
export default defineConfig({
  plugins: [
    {
      name: 'vite-bench-timer',
      configureServer(server) {
        const t0 = Date.now()
        server.httpServer?.once('listening', () => {
          console.log(`[vite] dev ready in ${Date.now() - t0} ms`)
        })
      },
      handleHotUpdate({ file }) {
        console.log(`[vite] hmr -> ${file}  ${new Date().toISOString()}`)
      },
    },
  ],

  server: {
    port: 5115,
    open: true,
  },

  build: {
    outDir: 'dist-vite',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
