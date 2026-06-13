import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Vite Mode 切换演示</h1>
    <table>
      <tr><th>来源</th><th>键</th><th>值</th></tr>
      <tr><td>define</td><td>__MODE__</td><td>${__MODE__}</td></tr>
      <tr><td>define</td><td>__COMMAND__</td><td>${__COMMAND__}</td></tr>
      <tr><td>define</td><td>__API_BASE__</td><td>${__API_BASE__}</td></tr>
      <tr><td>import.meta.env</td><td>MODE</td><td>${import.meta.env.MODE}</td></tr>
      <tr><td>import.meta.env</td><td>DEV</td><td>${import.meta.env.DEV}</td></tr>
      <tr><td>import.meta.env</td><td>PROD</td><td>${import.meta.env.PROD}</td></tr>
      <tr><td>import.meta.env</td><td>VITE_ENV_NAME</td><td>${import.meta.env.VITE_ENV_NAME}</td></tr>
      <tr><td>import.meta.env</td><td>VITE_API_BASE</td><td>${import.meta.env.VITE_API_BASE}</td></tr>
    </table>
    <h3>试试不同命令：</h3>
    <pre>
npm run dev           # mode=development
npm run dev:staging   # mode=staging
npm run build         # mode=production
npm run build:dev     # mode=development
npm run build:staging # mode=staging
    </pre>
  </div>
`
