// 通用 App 渲染函数（同构）
export function createApp(initialCount = 0) {
  let count = initialCount
  const html = `
    <section class="ssr-card">
      <h2>SSR 计数器组件</h2>
      <p>初始计数（服务端注入）：<strong id="count">${count}</strong></p>
      <button id="inc-btn">+1（仅在客户端激活后可点击）</button>
      <p class="hint">渲染时间戳：${new Date().toISOString()}</p>
    </section>
  `
  return { html, count }
}

// 客户端 hydrate 阶段使用
export function hydrate(rootEl) {
  const btn = rootEl.querySelector('#inc-btn')
  const countEl = rootEl.querySelector('#count')
  if (!btn || !countEl) return
  let n = Number(countEl.textContent) || 0
  btn.addEventListener('click', () => {
    n += 1
    countEl.textContent = String(n)
  })
}
