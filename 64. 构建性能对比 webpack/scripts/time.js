// 测量单个构建命令耗时
// 用法: node ./scripts/time.js vite | webpack
import { spawn } from 'node:child_process'
import { performance } from 'node:perf_hooks'

const target = process.argv[2] || 'vite'
const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const args = target === 'vite' ? ['vite', 'build'] : ['webpack', '--config', 'webpack.config.cjs']

const start = performance.now()
const child = spawn(cmd, args, { stdio: 'inherit', shell: true })

child.on('close', (code) => {
  const cost = (performance.now() - start).toFixed(2)
  console.log(`\n[${target}] build done in ${cost} ms (exit ${code})`)
})
