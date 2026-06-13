import './style.css'
import logo from './logo.svg'

// import.meta.env.BASE_URL 自动反映当前 base 配置
const base = import.meta.env.BASE_URL

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>base 部署路径演示</h1>

    <p><strong>当前 BASE_URL：</strong><code>${base}</code></p>

    <h2>资源引用</h2>
    <img src="${logo}" alt="logo" width="100" />
    <p>图片 URL：<code>${logo}</code></p>

    <h2>动态拼接（推荐）</h2>
    <p>访问 public 资源：<a href="${base}readme.txt" target="_blank">${base}readme.txt</a></p>
    <p>访问 API：<code>${base}api/users</code>（需要后端在该路径下提供）</p>

    <h2>构建命令</h2>
    <pre>
# 默认 base = '/'
npm run build

# 指定 base 为 /my-app/
npm run build:subpath
# 等价于： vite build --base=/my-app/
npm run preview:subpath
    </pre>

    <p>对比构建产物 <code>dist/index.html</code> 中的资源路径前缀差异。</p>
  </div>
`
