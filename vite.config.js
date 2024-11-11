import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  root: process.cwd(),
  base: "/",
  mode: "development",
  plugins: [],
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  envDir: "root",

  resolve: {
    alias: {
      '@assets': path.join(__dirname, "src/assets")
    }
  },

  // 开发服务器选项
  server: {
    host: "127.0.0.1",
    port: 3000,
    open: ""
  },

  // 构建选项
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets", // 指向生成静态资源的存放路径
    assetsInlineLimit: 4096,
    cssCodeSplit: true
  }
})