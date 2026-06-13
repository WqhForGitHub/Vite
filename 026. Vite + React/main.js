import './style.css'
import { renderCounter } from './counter.js'
import { getMessage } from './message.js'

const root = document.querySelector('#app')

function render() {
  root.innerHTML = `
    <div class="container">
      <h1>HMR 基础演示</h1>
      <p class="msg">${getMessage()}</p>
      <div id="counter"></div>
      <hr />
      <h3>试试看：</h3>
      <ul>
        <li>修改 <code>style.css</code> → 立即生效，无刷新</li>
        <li>修改 <code>message.js</code> 中的文本 → 模块热替换，状态保留</li>
        <li>修改 <code>counter.js</code> → 同样热替换，但计数会重置（因为这里没保留 state）</li>
      </ul>
    </div>
  `
  renderCounter(document.querySelector('#counter'))
}

render()

// HMR 边界声明：当本模块或其依赖被修改时，重新执行 render
if (import.meta.hot) {
  import.meta.hot.accept(['./message.js', './counter.js'], () => {
    console.log('[HMR] 模块更新，重新渲染')
    render()
  })
}
