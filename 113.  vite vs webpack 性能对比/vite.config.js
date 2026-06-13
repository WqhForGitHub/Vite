import { defineConfig } from 'vite'

// vite vs webpack 性能对比 demo（vite 端）
// 同一份源码同时用 vite 与 webpack 启动，比较：
//   1) dev 启动速度（首次/二次）
//   2) HMR 时延
//   3) build 体积与时间
// 这里给出 vite 的实现；webpack 配置见 webpack.config.cjs（用于对照）
function timerPlugin() {
  return {
    name: 'vite-bench-timer',
    configureServer(server) {
      const t0 = Date.now()
      server.httpServer?.once('listening', () => {
        console.log(`\n[vite] dev ready in ${Date.now() - t0} ms`)
      })
    },
  }
}

export default defineConfig({
  plugins: [timerPlugin()],
  server: {
    port: 5113,
    open: true,
  },
  build: {
    outDir: 'dist-vite',
    sourcemap: false,
    minify: 'esbuild',
  },
})
