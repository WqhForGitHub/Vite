import { defineConfig } from 'vite'

// 演示：define 全局常量替换
// define 会在编译期对源码进行字符串替换（类似 webpack DefinePlugin）
// 注意：值必须是 JSON.stringify 后的字符串
export default defineConfig({
  root: '.',
  base: '/',
  server: { port: 5173, open: true },

  define: {
    // 简单常量
    __APP_VERSION__: JSON.stringify('1.2.3'),
    __APP_NAME__: JSON.stringify('Define Demo'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),

    // 对象（也必须 stringify）
    __APP_CONFIG__: JSON.stringify({
      api: 'https://api.example.com',
      timeout: 5000,
      debug: true,
    }),

    // 布尔与数字
    __DEV__: true,
    __MAX_COUNT__: 100,
  },

  build: {
    outDir: 'dist',
  },
})
