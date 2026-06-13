import './style.css'

// 通过 import.meta.env 访问环境变量
const env = import.meta.env

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container">
    <h1>${env.VITE_APP_TITLE}</h1>
    <table>
      <tr><th>变量</th><th>值</th></tr>
      <tr><td>MODE</td><td>${env.MODE}</td></tr>
      <tr><td>DEV</td><td>${env.DEV}</td></tr>
      <tr><td>PROD</td><td>${env.PROD}</td></tr>
      <tr><td>BASE_URL</td><td>${env.BASE_URL}</td></tr>
      <tr><td>VITE_APP_TITLE</td><td>${env.VITE_APP_TITLE}</td></tr>
      <tr><td>VITE_APP_VERSION</td><td>${env.VITE_APP_VERSION}</td></tr>
      <tr><td>VITE_API_BASE</td><td>${env.VITE_API_BASE}</td></tr>
      <tr><td>VITE_ENV_NAME</td><td>${env.VITE_ENV_NAME}</td></tr>
      <tr><td>SECRET_TOKEN（无 VITE_ 前缀）</td><td>${env.SECRET_TOKEN ?? '(undefined - 不会暴露)'}</td></tr>
    </table>
  </div>
`

// 测试 fetch 用 env 中的 API 地址
console.log('[env] API 基础地址:', env.VITE_API_BASE)
