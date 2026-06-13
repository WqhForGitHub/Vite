// 演示 1：自接受 self-accept
// 模块自己声明 import.meta.hot.accept(cb)，cb 中拿到 newModule 重新挂载
let mountEl = null

export function mountSelfAccept(el) {
  mountEl = el
  el.innerHTML = `<p class="card">📦 self-accept 模块。当前消息：<strong>${getText()}</strong></p>`
}

function getText() {
  return 'Hello, edit me to see HMR self-accept in action!'
}

if (import.meta.hot) {
  import.meta.hot.accept((newMod) => {
    console.log('[self-accept] 模块更新，重新挂载')
    if (mountEl && newMod) newMod.mountSelfAccept(mountEl)
  })
}
