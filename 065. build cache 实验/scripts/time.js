// 测量 vite build 耗时
import { spawn } from 'node:child_process'
import { performance } from 'node:perf_hooks'

const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const start = performance.now()

const child = spawn(cmd, ['vite', 'build'], { stdio: 'inherit', shell: true })

child.on('close', (code) => {
  const cost = (performance.now() - start).toFixed(2)
  console.log(`\n[vite build] done in ${cost} ms (exit ${code})`)
})
