import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// 通过 resolve.alias 配置路径别名，避免出现一堆 ../../../
export default defineConfig({
  resolve: {
    alias: {
      // @ 指向 ./src
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 也可以配置多个别名
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
