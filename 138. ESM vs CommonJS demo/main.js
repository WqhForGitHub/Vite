// 演示 ESM 的静态分析、tree-shaking、循环依赖处理
import { add, multiply } from './math.js'
import math from './math.js'

const app = document.getElementById('app')

const comparison = [
  { feat: '加载时机', esm: '编译期（静态）', cjs: '运行时（动态）' },
  { feat: '语法关键字', esm: 'import / export', cjs: 'require / module.exports' },
  { feat: '默认浏览器支持', esm: '✅ 是', cjs: '❌ 否（需打包）' },
  { feat: 'Tree-Shaking', esm: '✅ 友好', cjs: '❌ 困难' },
  { feat: '是否异步', esm: '✅ 异步', cjs: '❌ 同步' },
  { feat: 'this 指向', esm: 'undefined', cjs: 'module.exports' },
  { feat: '顶层 await', esm: '✅ 支持', cjs: '❌ 不支持' },
  { feat: '循环依赖', esm: '通过 live binding 解决', cjs: '可能拿到未完成的导出' },
]

const rows = comparison
  .map(
    (r) => `
  <tr>
    <td>${r.feat}</td>
    <td>${r.esm.includes('✅') ? '<span class="yes">' + r.esm + '</span>' : r.esm}</td>
    <td>${r.cjs.includes('❌') ? '<span class="no">' + r.cjs + '</span>' : r.cjs}</td>
  </tr>
`,
  )
  .join('')

app.innerHTML = `
  <h2>🧪 实际运行结果（ESM）</h2>
  <p>add(2, 3) = <b>${add(2, 3)}</b></p>
  <p>multiply(4, 5) = <b>${multiply(4, 5)}</b></p>
  <p>default export keys = <b>${Object.keys(math).join(', ')}</b></p>

  <h2>📊 详细对比</h2>
  <table>
    <thead><tr><th>特性</th><th>ESM</th><th>CommonJS</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
`
