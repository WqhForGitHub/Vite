import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// 演示：Vite + Svelte
// 使用 @sveltejs/vite-plugin-svelte 处理 .svelte 单文件组件
export default defineConfig({
  plugins: [svelte()],
  server: { port: 5173, open: true },
})
