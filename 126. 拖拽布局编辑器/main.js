const canvas = document.getElementById('canvas')
const output = document.getElementById('output')
let blocks = [
  { id: 1, x: 20, y: 20, w: 160, h: 80, text: '块 1' },
  { id: 2, x: 220, y: 60, w: 200, h: 100, text: '块 2' },
]

function render() {
  canvas.innerHTML = ''
  blocks.forEach((b) => {
    const el = document.createElement('div')
    el.className = 'block'
    el.style.cssText = `left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px`
    el.innerHTML = `<span class="del" data-id="${b.id}">×</span>${b.text}<div class="resize"></div>`
    el.dataset.id = b.id
    canvas.appendChild(el)
  })
  output.textContent = JSON.stringify(blocks, null, 2)
}

let dragging = null
let resizing = null
canvas.addEventListener('mousedown', (e) => {
  const block = e.target.closest('.block')
  if (!block) return
  if (e.target.classList.contains('del')) {
    blocks = blocks.filter((b) => b.id !== +e.target.dataset.id)
    render()
    return
  }
  const b = blocks.find((x) => x.id === +block.dataset.id)
  if (e.target.classList.contains('resize')) {
    resizing = { b, sx: e.clientX, sy: e.clientY, sw: b.w, sh: b.h }
  } else {
    dragging = { b, sx: e.clientX, sy: e.clientY, x: b.x, y: b.y }
  }
})
document.addEventListener('mousemove', (e) => {
  if (dragging) {
    dragging.b.x = dragging.x + (e.clientX - dragging.sx)
    dragging.b.y = dragging.y + (e.clientY - dragging.sy)
    render()
  } else if (resizing) {
    resizing.b.w = Math.max(60, resizing.sw + (e.clientX - resizing.sx))
    resizing.b.h = Math.max(40, resizing.sh + (e.clientY - resizing.sy))
    render()
  }
})
document.addEventListener('mouseup', () => {
  dragging = null
  resizing = null
})

document.getElementById('add').onclick = () => {
  blocks.push({ id: Date.now(), x: 40, y: 40, w: 140, h: 80, text: '新块' })
  render()
}
document.getElementById('export').onclick = () => {
  alert('布局已导出到下方 JSON：\n' + JSON.stringify(blocks, null, 2))
}
render()
