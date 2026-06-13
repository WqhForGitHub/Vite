import './style.css'
import { createRouter } from './router.js'
import Home from './pages/Home.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <header>
    <nav>
      <a href="#/">首页</a>
      <a href="#/about">关于</a>
      <a href="#/contact">联系</a>
    </nav>
  </header>
  <main id="view"></main>
  <footer>纯 Vite + Vanilla JS SPA 示例</footer>
`

const view = document.querySelector('#view')

createRouter({
  '/': () => Home(view),
  '/about': () => About(view),
  '/contact': () => Contact(view),
})
