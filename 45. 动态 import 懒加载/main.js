const result = document.getElementById('result')

document.getElementById('loadChart').onclick = async () => {
  // 动态 import 触发懒加载
  const mod = await import('./pages/chart.js')
  result.textContent = mod.render()
}

document.getElementById('loadEditor').onclick = async () => {
  const mod = await import('./pages/editor.js')
  result.textContent = mod.render()
}
