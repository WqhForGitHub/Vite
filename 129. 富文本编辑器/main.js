const editor = document.getElementById('editor')
const output = document.getElementById('output')

function exec(cmd, val = null) {
  document.execCommand(cmd, false, val)
  editor.focus()
  update()
}

document.querySelectorAll('.toolbar button[data-cmd]').forEach((b) => {
  b.onclick = () => exec(b.dataset.cmd, b.dataset.val || null)
})

document.getElementById('color').oninput = (e) => exec('foreColor', e.target.value)
document.getElementById('link').onclick = () => {
  const url = prompt('链接地址：', 'https://')
  if (url) exec('createLink', url)
}
document.getElementById('clear').onclick = () => {
  editor.innerHTML = ''
  update()
}

function update() {
  output.textContent = editor.innerHTML
}
editor.addEventListener('input', update)
update()
