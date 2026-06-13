// 入口模块 - 顶层执行
const log = (msg) => {
  const el = document.getElementById('log')
  if (el) el.textContent += msg + '\n'
  console.log(msg)
}
window.__log = log

log('[main.js] ① Construction: 入口已下载')
log('[main.js] ② Parsing: 发现 import a, b, c')

import { a } from './mod-a.js'
import { b } from './mod-b.js'
import { c } from './mod-c.js'

log('[main.js] ⑤ Evaluation: a=' + a + ', b=' + b + ', c=' + c)
log('[main.js] ✅ 模块图构建并执行完成')
