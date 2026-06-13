import './style.css'
import { getMessage } from './message.js'

const msgEl = document.getElementById('msg')
const countEl = document.getElementById('count')
let count = 0

function render() {
  msgEl.textContent = getMessage()
}
render()

document.getElementById('btn').addEventListener('click', () => {
  count++
  countEl.textContent = count
})

// 让 message.js 的更新热替换：当它变更时重新调用 render
// 关键：import.meta.hot 只在 dev 时存在，生产 tree-shake 掉
if (import.meta.hot) {
  import.meta.hot.accept('./message.js', (newMod) => {
    if (!newMod) return
    msgEl.textContent = newMod.getMessage()
    console.log('[HMR] message.js 已热更新')
  })
}
