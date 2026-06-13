import './global.css'

// CSS Modules：只要文件名以 .module.css 结尾，import 默认就会得到一个对象
import card from './card.module.css'
import button from './button.module.css'

console.log('[CSS Modules] card =', card)
console.log('[CSS Modules] button =', button)

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="${card.container}">
    <h1 class="${card.title}">CSS Modules Demo</h1>
    <p class="${card.text}">每个组件都有自己作用域的类名，互不冲突</p>

    <div class="${card.actions}">
      <button class="${button.btn} ${button.primary}">Primary</button>
      <button class="${button.btn} ${button.danger}">Danger</button>
    </div>

    <h3>实际生成的类名（看 console）</h3>
    <pre>${JSON.stringify({ card, button }, null, 2)}</pre>
  </div>
`
