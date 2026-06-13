// 修改这里的数字保存，观察 HMR 应用耗时
export function setup(el) {
  let n = 0
  const base = 100 // <-- 修改此值触发 HMR
  el.innerHTML = ''
  const btn = document.createElement('button')
  btn.style.fontSize = '20px'
  btn.textContent = `count = ${base}`
  btn.onclick = () => {
    n++
    btn.textContent = `count = ${base + n}`
  }
  el.appendChild(btn)
}
