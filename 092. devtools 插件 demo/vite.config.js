import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Inspect from 'vite-plugin-inspect'

// devtools 插件 demo:
// - vite-plugin-vue-devtools: 在浏览器内嵌 Vue Devtools 面板
// - vite-plugin-inspect: 访问 /__inspect/ 查看每个文件经过哪些插件转换
// 文档: https://devtools.vuejs.org/   https://github.com/antfu/vite-plugin-inspect
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools({
      // 唤出快捷键
      launchEditor: 'code',
      // 是否注入到所有页面
      appendTo: 'src/main.js',
    }),
    Inspect({
      // 访问 http://localhost:5192/__inspect/
      build: false,
      dev: true,
    }),
  ],

  server: {
    port: 5192,
    open: true,
  },
})
