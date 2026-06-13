// 一个最小的 hash-free（history）路由实现，用于演示 SPA 思想
import { renderHome } from './views/home.js'
import { renderAbout } from './views/about.js'
import { renderUser } from './views/user.js'

const routes = [
  { path: /^\/$/, render: renderHome },
  { path: /^\/about$/, render: renderAbout },
  { path: /^\/user\/(\w+)$/, render: (m) => renderUser(m[1]) },
]

function render() {
  const view = document.getElementById('view')
  const pathname = location.pathname
  for (const r of routes) {
    const m = pathname.match(r.path)
    if (m) {
      view.innerHTML = r.render(m)
      return
    }
  }
  view.innerHTML = '<p>404 Not Found</p>'
}

// 拦截 [data-link] 链接，用 pushState 替代默认跳转
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-link]')
  if (!a) return
  e.preventDefault()
  history.pushState(null, '', a.getAttribute('href'))
  render()
})
window.addEventListener('popstate', render)
render()
