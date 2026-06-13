// 一键启动 host + app1 + app2 三个 vite dev server
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const apps = [
  { name: 'host', config: 'host/vite.config.js', color: '\x1b[36m' },
  { name: 'app1', config: 'app1/vite.config.js', color: '\x1b[32m' },
  { name: 'app2', config: 'app2/vite.config.js', color: '\x1b[34m' },
]

const RESET = '\x1b[0m'

for (const app of apps) {
  const child = spawn('npx', ['vite', '--config', app.config], {
    cwd: root,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const tag = `${app.color}[${app.name}]${RESET}`
  child.stdout.on('data', (d) => process.stdout.write(`${tag} ${d}`))
  child.stderr.on('data', (d) => process.stderr.write(`${tag} ${d}`))
  child.on('exit', (code) => console.log(`${tag} exited with ${code}`))
}
