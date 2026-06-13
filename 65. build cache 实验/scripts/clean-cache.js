// 清除 vite 缓存目录与构建产物，便于"冷启动"对照
import { rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const targets = ['node_modules/.vite-cache', 'node_modules/.vite', 'dist']

for (const t of targets) {
  const p = resolve(process.cwd(), t)
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true })
    console.log('[clean] removed', t)
  } else {
    console.log('[clean] skip   ', t)
  }
}
