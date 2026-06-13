const defaultSchema = [
  { type: 'input', name: 'username', label: '用户名', placeholder: '请输入用户名' },
  { type: 'input', name: 'email', label: '邮箱', placeholder: 'name@example.com' },
  { type: 'select', name: 'role', label: '角色', options: ['管理员', '普通用户', '游客'] },
  { type: 'textarea', name: 'remark', label: '备注', placeholder: '可选...' },
]

const schemaEl = document.getElementById('schema')
const formEl = document.getElementById('form')
const resultEl = document.getElementById('result')
schemaEl.value = JSON.stringify(defaultSchema, null, 2)

function render() {
  let schema
  try {
    schema = JSON.parse(schemaEl.value)
  } catch (e) {
    alert('JSON 解析失败: ' + e.message)
    return
  }
  formEl.innerHTML = schema
    .map((f) => {
      if (f.type === 'select') {
        return `<div class="field"><label>${f.label}</label>
        <select name="${f.name}">${f.options.map((o) => `<option>${o}</option>`).join('')}</select></div>`
      }
      if (f.type === 'textarea') {
        return `<div class="field"><label>${f.label}</label>
        <textarea name="${f.name}" placeholder="${f.placeholder || ''}" rows="3"></textarea></div>`
      }
      return `<div class="field"><label>${f.label}</label>
      <input name="${f.name}" placeholder="${f.placeholder || ''}" /></div>`
    })
    .join('')
}

document.getElementById('render').onclick = render
document.getElementById('submit').onclick = () => {
  const data = {}
  new FormData(formEl).forEach((v, k) => (data[k] = v))
  resultEl.textContent = JSON.stringify(data, null, 2)
}
render()
