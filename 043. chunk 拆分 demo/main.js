// 通过动态 import 触发 chunk 自动拆分
const output = document.getElementById('output')

document.getElementById('loadA').onclick = async () => {
  const { sayA } = await import('./modules/moduleA.js')
  output.textContent = sayA()
}

document.getElementById('loadB').onclick = async () => {
  const { sayB } = await import('./modules/moduleB.js')
  output.textContent = sayB()
}
