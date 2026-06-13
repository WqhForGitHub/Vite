// 简易 bench：分别启动 vite 与 webpack 比较"ready"耗时
import { spawn } from 'node:child_process'

function bench(cmd, args, readySignal) {
  return new Promise((resolve) => {
    const t0 = Date.now()
    const proc = spawn(cmd, args, { shell: true })
    proc.stdout.on('data', (chunk) => {
      const text = chunk.toString()
      process.stdout.write(text)
      if (readySignal.test(text)) {
        const cost = Date.now() - t0
        proc.kill()
        resolve(cost)
      }
    })
  })
}

;(async () => {
  console.log('\n=== bench vite ===')
  const v = await bench('npx', ['vite'], /ready in/i)
  console.log('\n=== bench webpack ===')
  const w = await bench(
    'npx',
    ['webpack', 'serve', '--config', 'webpack.config.cjs'],
    /compiled successfully/i,
  )
  console.log(`\nresult: vite=${v}ms, webpack=${w}ms`)
})()
