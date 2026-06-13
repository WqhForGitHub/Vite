// 3) 无人接受：bubble.js 没有 accept，main.js 也没有 accept
//    所以修改它会冒泡到入口仍找不到边界 → 整页刷新
const TEXT = '我是 bubble.js v1，改我会触发整页刷新'

export function mountBubble(el) {
  el.style.background = '#fff1f0'
  el.style.borderColor = '#ff4d4f'
  el.textContent = TEXT
}
