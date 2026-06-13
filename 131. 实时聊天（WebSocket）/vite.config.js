import { defineConfig } from 'vite'

// 实时聊天（WebSocket）demo
// 注：演示前端基于 WebSocket 的聊天实现，使用公共 echo 服务，
// 也可以自行启动 ws-server 替换。
export default defineConfig({
  server: { port: 5131, open: true },
  build: { outDir: 'dist' },
})
