import { defineConfig, loadEnv } from 'vite'

// 演示：HTML 模板变量注入
// Vite 支持在 index.html 中使用 %ENV_NAME% 语法注入环境变量
// 也可以通过 transformIndexHtml 钩子注入任意自定义变量
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: '.',
    base: '/',
    server: {
      port: 5173,
      open: true,
    },
    // 通过自定义插件 transformIndexHtml 注入变量
    plugins: [
      {
        name: 'html-inject',
        transformIndexHtml(html) {
          return html
            .replace(/<%= BUILD_TIME %>/g, new Date().toLocaleString())
            .replace(/<%= AUTHOR %>/g, 'Vite Demo')
        },
      },
    ],
    build: {
      outDir: 'dist',
    },
  }
})
