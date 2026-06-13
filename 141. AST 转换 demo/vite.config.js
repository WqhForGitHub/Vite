import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5141, open: true },
  optimizeDeps: {
    // 让 acorn 在 dev 期被 vite 预构建为 ESM
    include: ['acorn'],
  },
})
