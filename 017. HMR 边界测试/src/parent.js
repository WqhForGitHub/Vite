// 2) 父级边界：parent.js 自己没改，但 accept 了依赖 child.js，
//    所以修改 child.js 时，HMR 边界停在 parent.js（不会冒泡到 main.js）
import { childText } from './child.js'

let mountEl

export function mountParent(el) {
  mountEl = el
  render()
}

function render() {
  mountEl.style.background = '#fff7e6'
  mountEl.style.borderColor = '#fa8c16'
  mountEl.textContent = `parent.js -> ${childText}`
}

if (import.meta.hot) {
  import.meta.hot.accept('./child.js', (newMod) => {
    if (newMod && mountEl) {
      // 这里要使用最新模块导出的值
      mountEl.textContent = `parent.js -> ${newMod.childText}`
      console.log('[hmr] child.js 在 parent.js 边界被接受')
    }
  })
}
