import './src/critical.js'

document.getElementById('loadAbout').onclick = async () => {
  const m = await import('./src/pages/about.js')
  document.getElementById('out').textContent = m.text()
}

document.getElementById('loadLazy').onclick = async () => {
  // 文件名带 lazy- 前缀，会被 vite 配置过滤掉 preload
  const m = await import('./src/pages/lazy-deep.js')
  document.getElementById('out').textContent = m.text()
}
