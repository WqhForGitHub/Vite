// Remote 暴露的组件（普通 ESM 模块）
export function mountWidget(target) {
  let count = 0
  target.innerHTML = `
    <div style="padding:1rem;border:2px solid #41a;background:#fff;border-radius:6px">
      <h3 style="margin:0">[Remote Widget]</h3>
      <p>来自 http://localhost:5174 的远程组件</p>
      <button id="r-btn">点击：0</button>
    </div>
  `
  const btn = target.querySelector('#r-btn')
  btn.addEventListener('click', () => {
    count++
    btn.textContent = `点击：${count}`
  })
  return () => target.replaceChildren()
}
