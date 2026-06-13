import { defineConfig } from 'vite'

// 文件上传系统 demo
export default defineConfig({
  root: '.',
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    strictPort: false,
    // 配置一个简单的本地上传接口（mock）
    // 在真实项目中，应由后端提供 /api/upload 接口
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015',
  },
  preview: {
    port: 4173,
  },
  plugins: [
    {
      name: 'mock-upload-server',
      configureServer(server) {
        // 模拟分片上传 / 普通上传 / 秒传校验接口
        server.middlewares.use('/api/check', (req, res) => {
          // 秒传检查（始终返回未上传）
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ exists: false, uploadedChunks: [] }))
        })
        server.middlewares.use('/api/upload', (req, res) => {
          // 模拟分片上传成功
          let size = 0
          req.on('data', (chunk) => {
            size += chunk.length
          })
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, size }))
          })
        })
        server.middlewares.use('/api/merge', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, url: '/uploads/mock-file' }))
        })
      },
    },
  ],
})
