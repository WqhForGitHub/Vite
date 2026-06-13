// 简易低代码平台：拖拽 + 属性编辑
const canvas = document.getElementById('canvas')
const propsPanel = document.getElementById('props')
let items = []
let activeId = null

document.querySelectorAll('.comp').forEach((el) => {
  el.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('type', el.dataset.type)
  })
})

canvas.addEventListener('dragover', (e) => e.preventDefault())
canvas.addEventListener('drop', (e) => {
  e.preventDefault()
  const type = e.dataTransfer.getData('type')
  if (!type) return
  items.push({ id: Date.now(), type, text: defaultText(type) })
  render()
})

function defaultText(type) {
  return {
    text: '文本内容',
    button: '按钮',
    image: 'https://via.placeholder.com/100',
    input: '请输入',
  }[type]
}

function render() {
  if (!items.length) {
    canvas.innerHTML = '<p class="hint">拖拽左侧组件到此处</p>'
    return
  }
  canvas.innerHTML = ''
  items.forEach((it) => {
    const div = document.createElement('div')
    div.className = 'item' + (it.id === activeId ? ' active' : '')
    div.onclick = () => {
      activeId = it.id
      render()
      renderProps()
    }
    if (it.type === 'text') div.textContent = it.text
    else if (it.type === 'button') div.innerHTML = `<button>${it.text}</button>`
    else if (it.type === 'image') div.innerHTML = `<img src="${it.text}" style="max-width:200px" />`
    else if (it.type === 'input')
      div.innerHTML = `<input placeholder="${it.text}" style="padding:6px" />`
    canvas.appendChild(div)
  })
}

function renderProps() {
  const it = items.find((i) => i.id === activeId)
  if (!it) {
    propsPanel.innerHTML = '<p class="hint">请选择组件</p>'
    return
  }
  propsPanel.innerHTML = `<div class="props">
    <label>类型</label><input value="${it.type}" disabled />
    <label>内容</label><input id="txt" value="${it.text}" />
    <button id="del" style="margin-top:10px;background:#ff4d4f">删除</button>
  </div>`
  document.getElementById('txt').oninput = (e) => {
    it.text = e.target.value
    render()
  }
  document.getElementById('del').onclick = () => {
    items = items.filter((i) => i.id !== activeId)
    activeId = null
    render()
    renderProps()
  }
}
