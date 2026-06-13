// mini-vite 核心思路演示：
// 1) 浏览器以 ESM 方式直接加载源码（无打包）
// 2) dev server 拦截请求 -> 按需 transform -> 返回浏览器能识别的 ESM
// 3) 通过 import 重写解决"裸模块"无法在浏览器直接运行的问题
// 4) 借助 HMR 实现热更新

import { createServerSimulation } from './core/server.js'
import { transform } from './core/transform.js'
import { rewriteImports } from './core/import-analyzer.js'

const app = document.getElementById('app')

const sourceCode = `
import { hello } from 'lodash-es'
import './style.css'
const msg = hello('mini-vite')
console.log(msg)
`

// 1. 模拟 transform 流程
const transformed = transform(sourceCode, '/src/main.js')

// 2. 模拟 import 重写
const rewritten = rewriteImports(transformed)

// 3. 模拟 dev server 响应
const serverLog = createServerSimulation('/src/main.js')

app.innerHTML = `
  <div class="card">
    <div class="step">📥 步骤 1：原始源码（含裸模块 import）</div>
    <pre>${escapeHtml(sourceCode)}</pre>
  </div>
  <div class="card">
    <div class="step">⚙️ 步骤 2：mini-vite transform 后的代码</div>
    <pre>${escapeHtml(transformed)}</pre>
  </div>
  <div class="card">
    <div class="step">🔁 步骤 3：import 重写（裸模块 → 预构建路径）</div>
    <pre>${escapeHtml(rewritten)}</pre>
  </div>
  <div class="card">
    <div class="step">🌐 步骤 4：dev server 模拟响应日志</div>
    <pre>${escapeHtml(serverLog)}</pre>
  </div>
  <div class="card">
    <div class="step">✅ 核心思想总结</div>
    <ul>
      <li>① 利用浏览器原生 ESM，省去打包</li>
      <li>② dev server 按请求做 on-demand transform</li>
      <li>③ 裸模块 import 重写到 /node_modules/.vite/</li>
      <li>④ 配合 HMR client 实现极速热更新</li>
    </ul>
  </div>
`

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
}
