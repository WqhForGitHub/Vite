const htmlEl = document.getElementById('html')
const cssEl = document.getElementById('css')
const jsEl = document.getElementById('js')
const preview = document.getElementById('preview')

htmlEl.value = `<h1>Hello Vite Editor</h1>\n<button id="btn">点击我</button>\n<p id="msg"></p>`
cssEl.value = `body { font-family: sans-serif; padding: 20px; }\nh1 { color: #1890ff; }\nbutton { padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; }`
jsEl.value = `document.getElementById('btn').onclick = () => {\n  document.getElementById('msg').textContent = '当前时间：' + new Date().toLocaleTimeString()\n}`

function run() {
  const doc = `<!DOCTYPE html><html><head><style>${cssEl.value}</style></head><body>${htmlEl.value}<script>${jsEl.value}<\/script></body></html>`
  preview.srcdoc = doc
}

document.getElementById('run').onclick = run
;[htmlEl, cssEl, jsEl].forEach((el) => {
  let t
  el.addEventListener('input', () => {
    clearTimeout(t)
    t = setTimeout(run, 600)
  })
})
run()
