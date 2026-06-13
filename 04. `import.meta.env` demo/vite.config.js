import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },

  // 部署的公共基础路径，影响 import.meta.env.BASE_URL
  // 默认是 '/'，这里改成 '/my-app/' 你就能在页面看到 BASE_URL 跟着变
  base: '/',

  // 自定义暴露给客户端的环境变量前缀（默认 'VITE_'）
  // 改成数组可以同时支持多个前缀，如 ['VITE_', 'APP_']
  envPrefix: 'VITE_',

  // 通过 define 注入额外的"全局常量"，在客户端代码里也可以拿到
  // 注意：value 必须是 JSON 字符串
  define: {
    __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __APP_NAME__: JSON.stringify('import-meta-env-demo'),
  },

  build: {
    sourcemap: true,
  },
})
