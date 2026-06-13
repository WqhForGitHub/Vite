import './style.css'

// 1. 通过 import 引入资源（推荐，会被打包优化）
import logoUrl from './src/assets/logo.svg'
import srcImg from './src/assets/src-img.svg'

// 2. 显式指定 ?url 后缀（拿到 URL 字符串）
import logoUrlExplicit from './src/assets/logo.svg?url'

// 3. 显式指定 ?raw 后缀（拿到文件原始内容字符串）
import logoRaw from './src/assets/logo.svg?raw'

// 4. public 目录下的资源直接通过 / 路径访问（不经过 Vite 处理）
//    这里写在 HTML/JS 里都是 /public-img.svg
const publicImgUrl = '/public-img.svg'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container">
    <h1>静态资源加载</h1>

    <section>
      <h3>① import 资源（src/assets 下，会被打包指纹化）</h3>
      <img src="${logoUrl}" alt="logo" />
      <p>解析后的 URL：<code>${logoUrl}</code></p>
    </section>

    <section>
      <h3>② 在 CSS 里 url() 引用</h3>
      <div class="bg-box"></div>
    </section>

    <section>
      <h3>③ 用 ?url 后缀显式拿到 URL</h3>
      <img src="${logoUrlExplicit}" alt="logo url" />
    </section>

    <section>
      <h3>④ 用 ?raw 拿到原始内容</h3>
      <pre>${escapeHtml(logoRaw).slice(0, 200)}...</pre>
    </section>

    <section>
      <h3>⑤ public 目录的资源（不会经过打包，直接复制到根）</h3>
      <img src="${publicImgUrl}" alt="public" />
      <p>URL：<code>${publicImgUrl}</code></p>
    </section>

    <section>
      <h3>⑥ 通过 new URL() 拿到资源 URL（推荐用于动态资源）</h3>
      <img src="${new URL('./src/assets/src-img.svg', import.meta.url).href}" alt="dynamic" />
    </section>

    <section>
      <h3>⑦ 直接放在 HTML img 标签的 src（会被 Vite 改写）</h3>
      <img src="${srcImg}" alt="src img" />
    </section>
  </div>
`

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
}
