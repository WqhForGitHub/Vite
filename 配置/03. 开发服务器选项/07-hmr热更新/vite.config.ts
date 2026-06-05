// hmr：禁用或配置 HMR（热模块替换）连接
//
// 类型：boolean | {
//   protocol?: string,   // WebSocket 协议：'ws' 或 'wss'
//   host?: string,       // HMR WebSocket 主机
//   port?: number,       // HMR WebSocket 端口
//   path?: string,       // HMR WebSocket 路径
//   timeout?: number,    // 连接超时时间
//   overlay?: boolean,   // 是否显示错误遮罩层
//   clientPort?: number, // 客户端使用的端口（覆盖实际端口）
//   server?: Server,     // 自定义 HTTP 服务器处理 HMR 连接
// }
//
// 在默认配置下，Vite 之前的反向代理应该支持代理 WebSocket。
// 如果 HMR 客户端连接 WebSocket 失败，将兜底为绕过反向代理、
// 直接连接 WebSocket 到 Vite HMR 服务器。
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // ========== hmr 配置 ==========

    // 完整的 HMR 配置选项
    hmr: {
      // WebSocket 协议：'ws'（WebSocket）或 'wss'（WebSocket Secure）
      // 使用 HTTPS 时应设为 'wss'
      // protocol: 'ws',

      // HMR WebSocket 主机地址
      // host: 'localhost',

      // HMR WebSocket 端口
      // port: 5173,

      // HMR WebSocket 路径
      // path: '/__hmr',

      // 连接超时时间（毫秒）
      // timeout: 30000,

      // 是否在浏览器中显示错误遮罩层
      // 设为 false 可禁用开发服务器错误的屏蔽
      overlay: true,

      // 客户端端口（高级选项）
      // 只在客户端的情况下覆盖端口，允许为 websocket 提供不同的端口
      // 如果需要在 dev-server 情况下使用 SSL 代理，这非常有用
      // clientPort: 5173,
    },

    // ========== 禁用 HMR ==========
    // hmr: false,

    // ========== 常见场景 ==========

    // 场景一：在反向代理后面运行
    // 当 Vite 在反向代理（如 Nginx）后面运行时，
    // 可能需要配置 clientPort 使客户端连接到正确的端口
    // hmr: {
    //   clientPort: 443, // 反向代理的 HTTPS 端口
    //   protocol: 'wss', // 使用安全 WebSocket
    // },

    // 场景二：使用自定义服务器处理 HMR
    // 当 server.hmr.server 被定义后，Vite 将通过所提供的服务器来处理 HMR 连接
    // 适用于自签证书或想通过网络在某端口暴露 Vite 的情况
    // import http from 'node:http'
    // const hmrServer = http.createServer()
    // hmr: {
    //   server: hmrServer,
    // },

    // 场景三：避免反向代理 WebSocket 兜底错误
    // 可以通过以下方式之一：
    // 1. 将反向代理配置为代理 WebSocket
    // 2. 设置 server.strictPort = true 并设置 server.hmr.clientPort 的值与 server.port 相同
    // 3. 设置 server.hmr.port 为一个与 server.port 不同的值
  },
});
