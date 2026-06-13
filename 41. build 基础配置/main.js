import './style.css'

const app = document.getElementById('app')
app.innerHTML = `
  <p>运行 <code>npm run build</code> 查看 dist 输出</p>
  <p>构建时间: ${new Date().toLocaleString()}</p>
`
console.log('build 基础配置 demo')
