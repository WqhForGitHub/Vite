import './style.css'
import { mountSelfAccept } from './self-accept.js'
import { state, mountStateView } from './state.js'
import { mountTimer } from './timer.js'

const root = document.querySelector('#app')
root.innerHTML = `
  <div class="container">
    <h1>HMR 边界测试</h1>

    <section>
      <h2>① 自接受（self-accept）</h2>
      <p>修改 <code>self-accept.js</code> 中的文字，模块自己处理 HMR，状态保留。</p>
      <div id="self-accept"></div>
    </section>

    <section>
      <h2>② 接受依赖 + 状态保留</h2>
      <p>state 通过 <code>import.meta.hot.data</code> 跨更新保留。</p>
      <p>修改 <code>state.js</code> 试试，count 不会重置。</p>
      <div id="state"></div>
    </section>

    <section>
      <h2>③ dispose 清理副作用</h2>
      <p>定时器在模块更新前会被清理，避免泄漏。修改 <code>timer.js</code> 后看控制台输出。</p>
      <div id="timer"></div>
    </section>

    <section>
      <h2>④ 主动失效（invalidate）</h2>
      <p>修改 <code>main.js</code> 当前文件，因为没有 accept，会触发整页刷新。</p>
    </section>
  </div>
`

mountSelfAccept(document.querySelector('#self-accept'))
mountStateView(document.querySelector('#state'))
mountTimer(document.querySelector('#timer'))
