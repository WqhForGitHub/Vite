import './style.css'
// 注意：public 中的资源不要 import，直接以 / 路径引用
import vitePng from './src/logo-asset.svg' // src 中的资源会被 Vite 处理（带 hash）

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>publicDir 使用演示</h1>

    <h2>来自 public/ （原样拷贝，无 hash）</h2>
    <img src="/logo-public.svg" alt="public logo" width="120" />
    <p>路径：<code>/logo-public.svg</code></p>

    <h2>来自 src/ （Vite 处理，带 hash）</h2>
    <img src="${vitePng}" alt="src logo" width="120" />
    <p>路径：<code>${vitePng}</code></p>

    <h2>静态文本（public/）</h2>
    <p>访问 <a href="/robots.txt" target="_blank">/robots.txt</a></p>
    <p>访问 <a href="/data.json" target="_blank">/data.json</a></p>
  </div>
`
