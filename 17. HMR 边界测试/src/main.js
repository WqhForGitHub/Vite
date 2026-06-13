import { mountSelf } from './self.js'
import { mountParent } from './parent.js'
import { mountBubble } from './bubble.js'
import { mountInvalidate } from './invalidate.js'

let count = 0
const countEl = document.getElementById('count')
document.getElementById('btn').addEventListener('click', () => {
  count++
  countEl.textContent = count
})

mountSelf(document.getElementById('self-accept'))
mountParent(document.getElementById('parent-accept'))
mountBubble(document.getElementById('bubble'))
mountInvalidate(document.getElementById('invalidate'))

// 注意：main.js 自身没有 accept，所以任何冒泡到它的更新都会触发整页刷新
console.log('[demo-17] main.js loaded')
