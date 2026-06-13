// 演示 3：dispose 清理副作用
// 不清理定时器会导致每次热更新累积一个新的 interval（内存泄漏 + 重复打印）
export function mountTimer(el) {
  let tick = 0
  el.innerHTML = `<p class="card">⏱ 滴答：<strong id="tick">0</strong></p>`
  const tickEl = el.querySelector('#tick')

  const id = setInterval(() => {
    tick++
    tickEl.textContent = tick
  }, 1000)

  if (import.meta.hot) {
    // 模块即将被替换前调用，用于清理副作用
    import.meta.hot.dispose(() => {
      console.log('[timer] dispose: clear interval')
      clearInterval(id)
    })

    // 自接受
    import.meta.hot.accept((newMod) => {
      console.log('[timer] 模块更新')
      if (newMod) newMod.mountTimer(el)
    })
  }
}
