// 演示 2：通过 import.meta.hot.data 在多次热更新之间保留状态
const data = import.meta.hot?.data ?? {}
data.count ??= 0

export const state = data

export function mountStateView(el) {
  function render() {
    el.innerHTML = `
      <div class="card">
        <p>持久化计数：<strong>${data.count}</strong></p>
        <button id="add">+1</button>
        <button id="reset">重置</button>
      </div>
    `
    el.querySelector('#add').onclick = () => {
      data.count++
      render()
    }
    el.querySelector('#reset').onclick = () => {
      data.count = 0
      render()
    }
  }
  render()

  if (import.meta.hot) {
    import.meta.hot.accept((newMod) => {
      console.log('[state] 模块更新，count 仍然 =', data.count)
      if (newMod) newMod.mountStateView(el)
    })
  }
}
