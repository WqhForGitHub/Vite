// 4) 主动放弃 HMR：在 accept 中调用 invalidate()，告诉 Vite“别热更新了，请整页刷新”
//    适合本模块状态难以恢复、热更不安全的场景
const TEXT = '我是 invalidate.js v1，改我会强制整页刷新'

export function mountInvalidate(el) {
  el.style.background = '#f9f0ff'
  el.style.borderColor = '#722ed1'
  el.textContent = TEXT
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('[hmr] invalidate.js 拒绝热更，回退到整页刷新')
    import.meta.hot.invalidate()
  })
}
