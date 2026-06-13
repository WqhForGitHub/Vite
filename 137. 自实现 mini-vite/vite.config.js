import { defineConfig } from 'vite'

// 自实现 mini-vite demo 的 vite 配置
// 我们使用真实 vite 启动 demo，并通过自定义插件演示 mini-vite 核心思想：
// 1. 拦截 .js / .ts / .vue 等模块请求
// 2. 进行 import 重写（裸模块 -> /node_modules/.vite/...）
// 3. 利用 304/HMR 思想做轻量响应
export default defineConfig({
  server: {
    port: 5137,
    open: true,
  },
  plugins: [
    {
      name: 'mini-vite-demo-plugin',
      transform(code, id) {
        // 仅在 demo 入口文件添加一行注释，证明插件参与了转换流程
        if (id.endsWith('main.js')) {
          return {
            code: `/* [mini-vite-demo-plugin] transformed at ${new Date().toISOString()} */\n${code}`,
            map: null,
          }
        }
        return null
      },
    },
  ],
})
