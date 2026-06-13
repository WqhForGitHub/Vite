import './main.css'

document.getElementById('loadPage').onclick = async () => {
  const mod = await import('./pages/sub.js')
  mod.render(document.getElementById('container'))
}
