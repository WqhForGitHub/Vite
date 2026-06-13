import './style.css'
import bigLogo from './assets/big-logo.svg' // src 中的资产 -> 进 dist/static/files/
// public 中的资产则保持原始路径

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>assetsDir 演示</h1>
    <p>当前 <code>build.assetsDir = 'static/files'</code></p>

    <h2>来自 src/（Vite 处理）</h2>
    <img src="${bigLogo}" alt="big logo" width="120" />
    <p>运行时路径：<code>${bigLogo}</code></p>

    <h2>来自 public/（原样拷贝）</h2>
    <img src="/public-logo.svg" alt="public logo" width="120" />
    <p>运行时路径：<code>/public-logo.svg</code></p>

    <h2>构建后的目录结构（运行 npm run build 查看 dist/）</h2>
    <pre>
dist/
├── index.html
├── public-logo.svg          ← 来自 public/，原样拷贝到 dist 根目录
└── static/files/            ← assetsDir 指定的目录
    ├── index-[hash].js
    ├── index-[hash].css
    └── big-logo-[hash].svg  ← 来自 src/，被 Vite 处理过
    </pre>
  </div>
`
