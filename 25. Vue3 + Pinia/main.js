import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container">
    <h1>server proxy 代理演示</h1>
    <p>下面三个按钮发送的请求都会被 vite dev server 代理到外部服务，浏览器看到的仍是同源请求，不存在跨域问题。</p>

    <div class="actions">
      <button id="btn-posts">GET /api/posts/1</button>
      <button id="btn-users">GET /api/users</button>
      <button id="btn-github">GET /github/repos/vitejs/vite</button>
    </div>

    <h3>响应：</h3>
    <pre id="output">点击按钮发送请求...</pre>
  </div>
`

const output = document.querySelector('#output')

async function fetchAndShow(url) {
  output.textContent = `请求中： ${url}\n...`
  try {
    const res = await fetch(url)
    const data = await res.json()
    output.textContent = `${url}\n\n` + JSON.stringify(data, null, 2).slice(0, 1500)
  } catch (e) {
    output.textContent = `❌ 错误：${e.message}`
  }
}

document.querySelector('#btn-posts').addEventListener('click', () => fetchAndShow('/api/posts/1'))
document.querySelector('#btn-users').addEventListener('click', () => fetchAndShow('/api/users'))
document
  .querySelector('#btn-github')
  .addEventListener('click', () => fetchAndShow('/github/repos/vitejs/vite'))
