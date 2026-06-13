/**
 * 入口模块：组装所有 HMR 演示
 *
 * 关键 API：
 *   import.meta.hot.accept()           —— 接受自身更新
 *   import.meta.hot.accept(deps, cb)   —— 接受依赖更新
 *   import.meta.hot.dispose()          —— 模块被替换前的清理
 *   import.meta.hot.invalidate()       —— 主动放弃 HMR，冒泡
 *   import.meta.hot.on('vite:xxx', ..) —— 监听 HMR 事件
 */

import { mountCounter } from './src/counter.js'
import { mountData } from './src/data.js'
import { mountNoAccept } from './src/no-accept.js'
import './src/widget.css'

// 挂载各演示模块
let counter = mountCounter(document.getElementById('counter-mount'))
let data = mountData(document.getElementById('data-mount'))
mountNoAccept(document.getElementById('no-accept-mount'))

// ============================================================
// HMR 日志面板：监听并打印所有 vite:* 事件
// ============================================================
const logEl = document.getElementById('log')
const clearBtn = document.getElementById('clear-log')

function log(type, data) {
  if (!logEl) return
  const time = new Date().toLocaleTimeString()
  const item = document.createElement('div')
  item.className = `log-item log-${type}`
  item.innerHTML = `<span class="time">${time}</span> <span class="type">${type}</span> <span class="data">${
    data ? JSON.stringify(data).slice(0, 150) : ''
  }</span>`
  logEl.prepend(item)
  // 只保留最近 50 条
  while (logEl.children.length > 50) logEl.removeChild(logEl.lastChild)
}

clearBtn?.addEventListener('click', () => (logEl.innerHTML = ''))

if (import.meta.hot) {
  log('init', { msg: 'HMR 客户端就绪 ✅' })

  // Vite 内置事件
  import.meta.hot.on('vite:beforeUpdate', (payload) => log('vite:beforeUpdate', payload))
  import.meta.hot.on('vite:afterUpdate', (payload) => log('vite:afterUpdate', payload))
  import.meta.hot.on('vite:beforeFullReload', (payload) => log('vite:beforeFullReload', payload))
  import.meta.hot.on('vite:beforePrune', (payload) => log('vite:beforePrune', payload))
  import.meta.hot.on('vite:invalidate', (payload) => log('vite:invalidate', payload))
  import.meta.hot.on('vite:error', (payload) => log('vite:error', payload?.err?.message))
  import.meta.hot.on('vite:ws:connect', () => log('vite:ws:connect', { msg: 'WebSocket 已连接' }))
  import.meta.hot.on('vite:ws:disconnect', () =>
    log('vite:ws:disconnect', { msg: 'WebSocket 已断开' }),
  )

  // 自定义事件（来自 vite.config.js 的插件）
  import.meta.hot.on('server:tick', (data) => log('server:tick', data))
  import.meta.hot.on('hmr:file-changed', (data) => log('hmr:file-changed', data))

  // 接受 counter 模块更新（accept 依赖）
  import.meta.hot.accept('./src/counter.js', (newMod) => {
    log('accept', { dep: 'counter.js' })
    document.getElementById('counter-mount').innerHTML = ''
    counter = newMod.mountCounter(document.getElementById('counter-mount'))
  })

  // 接受 data 模块更新
  import.meta.hot.accept('./src/data.js', (newMod) => {
    log('accept', { dep: 'data.js' })
    document.getElementById('data-mount').innerHTML = ''
    data = newMod.mountData(document.getElementById('data-mount'))
  })

  // 注意：no-accept.js 没有被 accept，当它修改时会冒泡到 main.js，
  // 这里我们也未对它 accept，最终会触发整页刷新。

  // 入口模块自身的清理
  import.meta.hot.dispose(() => {
    log('dispose', { msg: '入口模块即将被替换' })
  })
}

console.log('[HMR Demo] 入口已加载')
