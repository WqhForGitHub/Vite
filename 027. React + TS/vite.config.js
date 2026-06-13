import { defineConfig } from 'vite'

// 演示：HMR 边界测试
// 重点对比三种情况：
// 1. 自接受（self-accept）：模块自己处理热更新
// 2. 接受依赖（accept deps）：父模块处理某些子模块的热更新
// 3. 主动失效（invalidate）：放弃热更，强制 reload
// 4. 模块销毁钩子（dispose）：清理副作用（定时器、监听器等）
export default defineConfig({
  root: '.',
  base: '/',
  server: {
    port: 5173,
    open: true,
    hmr: { overlay: true },
  },
})
