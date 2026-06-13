// 入口文件，引入资源观察 build 后 hash 命名
import './style.css'

const app = document.getElementById('app')
app.innerHTML = `
  <p>构建产物示例：</p>
  <ul>
    <li>assets/js/index.[hash].js</li>
    <li>assets/css/index.[hash].css</li>
    <li>assets/img/xxx.[hash].png</li>
  </ul>
`
console.log('hello asset hash')
