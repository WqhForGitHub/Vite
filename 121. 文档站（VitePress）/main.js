const docs = {
  intro: {
    title: '介绍',
    body: '<p>ViteDocs 是一个使用 Vite 搭建的轻量级静态文档站点示例。</p><p>它支持快速冷启动、按需编译，并具备良好的开发体验。</p>',
  },
  install: {
    title: '安装',
    body: '<p>使用 npm 安装：</p><pre>npm install vite -D</pre><p>或使用 pnpm：</p><pre>pnpm add vite -D</pre>',
  },
  config: {
    title: '配置',
    body: '<p>在项目根目录创建 <code>vite.config.js</code>：</p><pre>import { defineConfig } from "vite"\nexport default defineConfig({\n  server: { port: 3000 }\n})</pre>',
  },
  plugins: {
    title: '插件',
    body: '<p>Vite 兼容 Rollup 插件生态，常用插件：</p><ul style="padding-left:24px;line-height:2"><li>@vitejs/plugin-vue</li><li>@vitejs/plugin-react</li><li>vite-plugin-pwa</li></ul>',
  },
  deploy: {
    title: '部署',
    body: '<p>构建：</p><pre>npm run build</pre><p>将 <code>dist</code> 目录部署到任意静态服务器即可。</p>',
  },
}

const content = document.getElementById('content')
const links = document.querySelectorAll('.sidebar a')
function show(key) {
  const d = docs[key]
  content.innerHTML = `<h1>${d.title}</h1>${d.body}`
  links.forEach((a) => a.classList.toggle('active', a.dataset.page === key))
}
links.forEach((a) => (a.onclick = () => show(a.dataset.page)))
show('intro')
