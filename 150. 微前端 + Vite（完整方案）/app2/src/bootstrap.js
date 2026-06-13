// App2 子应用入口
let rootEl = null
let count = 0

export async function mount(container, props = {}) {
  rootEl = document.createElement('div')
  rootEl.className = 'app2-root'
  rootEl.innerHTML = `
    <style>
      .app2-root { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; }
      .app2-root h2 { margin: 0 0 8px; color: #1e40af; }
    </style>
    <h2>App2（蓝色 / React 风格示例）</h2>
    <p>来自 host 的 props：<code>${JSON.stringify(props)}</code></p>
    <p>计数器（演示子应用内部状态独立性）：<strong id="app2-count">0</strong></p>
    <button id="app2-btn">+1</button>
    <button id="app2-emit">向 host 发送自定义事件</button>
  `
  container.appendChild(rootEl)

  rootEl.querySelector('#app2-btn').addEventListener('click', () => {
    count += 1
    rootEl.querySelector('#app2-count').textContent = String(count)
  })

  rootEl.querySelector('#app2-emit').addEventListener('click', () => {
    window.dispatchEvent(
      new CustomEvent('micro:app2:hello', {
        detail: { from: 'app2', count, time: Date.now() },
      }),
    )
    console.log('[app2] dispatched micro:app2:hello')
  })

  console.log('[app2] mounted')
}

export async function unmount() {
  rootEl?.remove()
  rootEl = null
  count = 0
  console.log('[app2] unmounted')
}
