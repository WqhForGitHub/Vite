import { defineConfig, loadEnv } from 'vite'

// 使用函数形式的配置，可以拿到 mode/command，然后手动 loadEnv 读取 .env 文件
export default defineConfig(({ mode, command }) => {
  // loadEnv(mode, envDir, prefixes)
  // 第三个参数留空 = 加载所有变量（包含没有 VITE_ 前缀的，仅在配置文件中可见，不会暴露到客户端）
  const env = loadEnv(mode, process.cwd(), '')

  console.log(`\n[vite.config] command=${command}, mode=${mode}`)
  console.log(`[vite.config] VITE_API_BASE = ${env.VITE_API_BASE}`)
  console.log(`[vite.config] SECRET_TOKEN = ${env.SECRET_TOKEN}（仅配置文件中可见）\n`)

  return {
    server: {
      port: 5173,
      open: true,
    },

    // 演示：把没有 VITE_ 前缀的变量手动注入到客户端代码（按需，谨慎使用）
    // define: {
    //   __APP_VERSION__: JSON.stringify(env.npm_package_version),
    // },

    // 自定义暴露给客户端的环境变量前缀（默认就是 'VITE_'）
    envPrefix: ['VITE_'],

    build: {
      outDir: `dist-${mode}`, // 不同 mode 产物输出到不同目录
      sourcemap: true,
    },
  }
})
