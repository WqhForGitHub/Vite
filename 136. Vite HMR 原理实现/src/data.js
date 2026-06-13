/**
 * 数据模块：演示「数据模块的 HMR」
 * 修改下面的 list 数组，浏览器会用新数据重渲染列表，且 main.js 中的状态保持不变。
 */

export const list = [
  { id: 1, name: '🍎 苹果', price: 5 },
  { id: 2, name: '🍌 香蕉', price: 3 },
  { id: 3, name: '🍊 橙子', price: 4 },
  { id: 4, name: '🍇 葡萄', price: 8 },
  { id: 5, name: '🍓 草莓', price: 12 },
]

export function mountData(el) {
  const total = list.reduce((s, i) => s + i.price, 0)
  el.innerHTML = `
    <ul class="data-list">
      ${list.map((it) => `<li><span>${it.name}</span><span>¥${it.price}</span></li>`).join('')}
    </ul>
    <p class="muted">共 ${list.length} 项，合计 ¥${total}</p>
  `
}

if (import.meta.hot) {
  // 声明本模块支持 HMR；具体重挂载逻辑放在 main.js 的 accept 回调里
  import.meta.hot.accept()
}
