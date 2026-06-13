// 串行执行 vite build 与 webpack build，输出耗时对比
import { spawnSync } from 'node:child_process'
import { performance } from 'node:perf_hooks'

const isWin = process.platform === 'win32'
const npx = isWin ? 'npx.cmd' : 'npx'

function run(name, args) {
  const start = performance.now()
  const r = spawnSync(npx, args, { stdio: 'inherit', shell: true })
  const cost = performance.now() - start
  return { name, cost, code: r.status }
}

const results = []
results.push(run('vite', ['vite', 'build']))
results.push(run('webpack', ['webpack', '--config', 'webpack.config.cjs']))

console.log('\n=========== 构建耗时对比 ===========')
for (const r of results) {
  console.log(`${r.name.padEnd(8)}: ${r.cost.toFixed(2)} ms (exit ${r.code})`)
}
const [v, w] = results
if (v.cost && w.cost) {
  const ratio = (w.cost / v.cost).toFixed(2)
  console.log(`\nwebpack / vite = ${ratio}x`)
}
