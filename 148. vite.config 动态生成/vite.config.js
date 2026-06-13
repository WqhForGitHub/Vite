import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

// vite.config 动态生成 demo
// 演示 4 种动态配置方式：
//  1. 函数形式：根据 command / mode 返回不同配置
//  2. loadEnv：根据 .env.[mode] 文件注入变量
//  3. 异步：从远程/本地文件读取后再返回（这里读 ./config/runtime.json）
//  4. 通过 define 把动态生成的 __APP_INFO__ 注入到客户端
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // 模拟从外部数据源拉取（这里读取本地 JSON）
  const runtimeFile = path.resolve(process.cwd(), 'config/runtime.json')
  let runtime = { features: [] }
  if (fs.existsSync(runtimeFile)) {
    runtime = JSON.parse(fs.readFileSync(runtimeFile, 'utf-8'))
  }

  const portMap = {
    development: 5148,
    staging: 5248,
    production: 5348,
  }

  const appInfo = {
    command,
    mode,
    apiBase: env.VITE_API_BASE || '/api',
    runtime,
    builtAt: new Date().toISOString(),
  }

  console.log('[dynamic-config] 生成的最终配置：', appInfo)

  return {
    server: {
      port: portMap[mode] ?? 5148,
      open: true,
    },
    define: {
      __APP_INFO__: JSON.stringify(appInfo),
    },
    build: {
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'esbuild' : false,
      outDir: `dist/${mode}`,
    },
  }
})
