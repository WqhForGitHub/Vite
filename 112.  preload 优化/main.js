document.getElementById('go').onclick = async () => {
  // build 时会被拆为独立 chunk，并自动 modulepreload 其依赖
  const { renderA } = await import('./pages/page-a.js')
  document.getElementById('out').textContent = renderA()
}
