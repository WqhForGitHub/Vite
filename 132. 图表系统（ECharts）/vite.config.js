import { defineConfig } from 'vite'

// 图表系统（ECharts）demo
export default defineConfig({
  server: { port: 5132, open: true },
  build: { outDir: 'dist' },
})
