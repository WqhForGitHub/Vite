// middlewareMode：以中间件模式创建 Vite 服务器
//
// 类型：boolean | { server: HttpServer }
// 默认值：false
//
// 以中间件模式创建 Vite 服务器时，Vite 不会自己启动 HTTP 服务器，
// 而是将自身作为中间件附加到你自己的 HTTP 服务器（如 Express）上。
//
// 相关配置：appType
//   - 'spa'：包含 HTML 中间件以及使用 SPA 回退
//   - 'mpa'：包含 HTML 中间件
//   - 'custom'：不包含 HTML 中间件
//
// 当使用 middlewareMode 时，通常需要配合 appType: 'custom'
//
// 注意：middlewareMode 不能通过 vite CLI 直接运行，
// 需要在自定义服务器脚本中通过 createServer API 使用
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // 启用中间件模式
    // 注意：启用后无法通过 vite CLI 单独启动
    // 需要在自定义服务器中通过 createServer API 使用
    // middlewareMode: true,
  },

  // 配合中间件模式，通常设置为 'custom'
  // 不引入 Vite 默认的 HTML 处理中间件
  // appType: 'custom',
});

// ========== 完整的 Express 集成示例 ==========
//
// 以下代码展示如何将 Vite 作为中间件集成到 Express 应用中。
// 可以在 server.ts 或类似的入口文件中使用：
//
// import express from 'express'
// import { createServer as createViteServer } from 'vite'
//
// async function createServer() {
//   const app = express()
//
//   // 以中间件模式创建 Vite 服务器
//   const vite = await createViteServer({
//     server: { middlewareMode: true },
//     appType: 'custom', // 不引入 Vite 默认的 HTML 处理中间件
//   })
//
//   // 将 vite 的 connect 实例作为中间件使用
//   app.use(vite.middlewares)
//
//   app.use('*', async (req, res) => {
//     // 由于 appType 为 'custom'，应在此处提供响应
//     // 注意：如果 appType 为 'spa' 或 'mpa'，Vite 会包含
//     // 处理 HTML 请求和 404 的中间件，因此用户中间件应该在
//     // Vite 的中间件之前添加，以确保其生效
//   })
//
//   app.listen(3000)
// }
//
// createServer()
