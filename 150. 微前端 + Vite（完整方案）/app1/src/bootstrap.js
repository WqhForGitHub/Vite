// App1 子应用入口（被 host 远程 import）
// 必须导出 mount / unmount 钩子，host 调用它们完成生命周期管理
let timerId = null
let rootEl = null

export async function mount(container, props = {}) {
  rootEl = document.createElement('div')
  rootEl.className = 'app1-root'
  rootEl.innerHTML = `
    <style>
      .app1-root { background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; }
      .app1-root h2 { margin: 0 0 8px; color: #065f46; }
      .app1-root .clock { font-family: monospace; font-size: 14px; }
    </style>
    <h2>App1（绿色 / Vue 风格示例）</h2>
    <p>来自 host 的 props：<code>${JSON.stringify(props)}</code></p>
    <p class="clock">实时时钟：<span id="app1-clock"></span></p>
    <button id="app1-btn">App1 按钮：点我</button>
    <p id="app1-msg"></p>
  `
  container.appendChild(rootEl)

  const clockEl = rootEl.querySelector('#app1-clock')
  const tick = () => {
    clockEl.textContent = new Date().toLocaleTimeString()
  }
  tick()
  timerId = setInterval(tick, 1000)

  rootEl.querySelector('#app1-btn').addEventListener('click', () => {
    rootEl.querySelector('#app1-msg').textContent = '点击于 ' + new Date().toLocaleTimeString()
  })

  console.log('[app1] mounted')
}

export async function unmount() {
  if (timerId) clearInterval(timerId)
  timerId = null
  rootEl?.remove()
  rootEl = null
  console.log('[app1] unmounted')
}
