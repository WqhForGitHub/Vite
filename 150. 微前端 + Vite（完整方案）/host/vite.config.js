import { defineConfig } from 'vite'
import path from 'node:path'

// 主应用（host）配置
// 微前端方案要点：
// 1. 主应用提供「容器 + 路由切换 + 子应用注册表」
// 2. 通过原生 ESM `import()` 远程加载子应用入口（Vite dev/build 都直接产出标准 ESM）
// 3. 每个子应用挂载到独立的 DOM 节点；卸载时调用其导出的 unmount 钩子
export default defineConfig({
  root: __dirname,
  publicDir: path.resolve(__dirname, '../public'),
  server: {
    port: 5150,
    open: true,
    cors: true,
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/host'),
  },
})
