import { defineConfig, loadEnv } from 'vite'

// 演示：mode 切换
// vite 默认 mode：dev 命令 = development，build 命令 = production
// 也可以通过 --mode xxx 指定，对应加载 .env.xxx 文件
export default defineConfig(({ command, mode }) => {
  // command: 'serve' | 'build'
  // mode: 'development' | 'production' | 'staging' | ...
  console.log(`[vite.config] command=${command}, mode=${mode}`)

  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: '.',
    base: '/',
    server: { port: 5173, open: true },

    define: {
      __MODE__: JSON.stringify(mode),
      __COMMAND__: JSON.stringify(command),
      __API_BASE__: JSON.stringify(env.VITE_API_BASE || ''),
    },

    build: {
      outDir: `dist-${mode}`, // 不同 mode 输出到不同目录
      sourcemap: mode !== 'production', // 生产模式关闭 sourcemap
      minify: mode === 'production' ? 'esbuild' : false,
    },
  }
})
