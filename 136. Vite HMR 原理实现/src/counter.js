/**
 * 计数器模块：演示「accept 自身」
 * 修改本文件后，浏览器会就地更新此模块，且调用 dispose 进行清理。
 */

let timer = null

export function mountCounter(el) {
  // 试着修改下面的初始值或文案，保存后观察「就地更新」效果
  let count = 0
  const initialMsg = '点击下方按钮 +1，或等待自动 +1（每秒）：'

  el.innerHTML = `
    <p>${initialMsg}</p>
    <div class="counter-row">
      <button class="counter-btn">+ 1</button>
      <span class="counter-val">0</span>
    </div>
  `

  const btn = el.querySelector('.counter-btn')
  const val = el.querySelector('.counter-val')
  const update = () => (val.textContent = String(count))

  btn.addEventListener('click', () => {
    count++
    update()
  })

  // 自动累加，演示 dispose 清理副作用
  timer = setInterval(() => {
    count++
    update()
  }, 1000)

  return { destroy: () => clearInterval(timer) }
}

// 接受自身更新：保留 mountCounter 入口，由调用方重新挂载
if (import.meta.hot) {
  import.meta.hot.accept((newMod) => {
    // 这里其实可以为空，因为我们在 main.js 中通过 accept('./src/counter.js')
    // 处理了重新挂载。这种 self-accept 主要用来声明「本模块支持 HMR」。
    console.log('[counter] 自身 accept 触发，新模块：', newMod)
  })

  // 模块被替换前清理副作用
  import.meta.hot.dispose(() => {
    if (timer) clearInterval(timer)
  })
}
