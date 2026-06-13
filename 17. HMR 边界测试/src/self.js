// 1) 自接受边界：调用 import.meta.hot.accept() 不带参数 = 接受自身更新
const COLOR = '#1677ff'

export function mountSelf(el) {
  el.style.background = COLOR
  el.style.color = '#fff'
  el.textContent = `self.js (color = ${COLOR})`
}

if (import.meta.hot) {
  import.meta.hot.accept((newMod) => {
    if (newMod) {
      // 重新挂载即可
      newMod.mountSelf(document.getElementById('self-accept'))
      console.log('[hmr] self.js 自接受更新')
    }
  })
}
