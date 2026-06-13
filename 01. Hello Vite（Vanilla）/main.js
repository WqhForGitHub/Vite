import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container">
    <h1>Hello Vite 👋</h1>
    <p>这是一个最简单的 Vanilla JS + Vite Demo</p>
    <button id="counter" type="button">count is 0</button>
  </div>
`

// 一个简单的计数器，用来演示热更新（HMR）
let count = 0
const button = document.querySelector('#counter')
button.addEventListener('click', () => {
  count++
  button.textContent = `count is ${count}`
})
