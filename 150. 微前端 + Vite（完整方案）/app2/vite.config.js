import { defineConfig } from 'vite'
import path from 'node:path'

// 子应用 App2 配置（与 App1 类似，端口不同）
export default defineConfig({
  root: __dirname,
  server: {
    port: 5152,
    cors: true,
    origin: 'http://localhost:5152',
    hmr: { port: 5162 },
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/app2'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/bootstrap.js'),
      output: {
        format: 'es',
        entryFileNames: 'bootstrap.js',
      },
    },
  },
})
