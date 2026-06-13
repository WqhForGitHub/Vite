const docs = {
  button: {
    title: 'Button 按钮',
    desc: '常用的操作按钮，支持多种类型与状态。',
    demo: `<button class="btn">默认</button><button class="btn primary">主要</button><button class="btn danger">危险</button>`,
    code: `<button class="btn">默认</button>\n<button class="btn primary">主要</button>\n<button class="btn danger">危险</button>`,
    api: [
      ['type', 'string', 'default', '按钮类型，可选 primary / danger'],
      ['disabled', 'boolean', 'false', '是否禁用'],
    ],
  },
  input: {
    title: 'Input 输入框',
    desc: '通过鼠标或键盘输入字符。',
    demo: `<input class="input" placeholder="请输入..." />`,
    code: `<input class="input" placeholder="请输入..." />`,
    api: [
      ['placeholder', 'string', '-', '占位符'],
      ['value', 'string', '-', '输入框值'],
    ],
  },
  alert: {
    title: 'Alert 提示',
    desc: '展示重要的提示信息。',
    demo: `<div class="alert info">信息提示</div><div class="alert success">操作成功</div><div class="alert warning">警告信息</div>`,
    code: `<div class="alert info">信息提示</div>\n<div class="alert success">操作成功</div>`,
    api: [['type', 'string', 'info', '类型：info/success/warning']],
  },
  card: {
    title: 'Card 卡片',
    desc: '通用卡片容器。',
    demo: `<div class="card"><h3>标题</h3><p>这是一段卡片内容</p></div>`,
    code: `<div class="card"><h3>标题</h3><p>这是一段卡片内容</p></div>`,
    api: [['title', 'string', '-', '卡片标题']],
  },
}

const links = document.querySelectorAll('.sidebar a')
const content = document.getElementById('content')
function show(key) {
  const d = docs[key]
  const apiRows = d.api
    .map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3] || ''}</td></tr>`)
    .join('')
  content.innerHTML = `
    <h1>${d.title}</h1>
    <p>${d.desc}</p>
    <h2 style="margin-top:14px">基础用法</h2>
    <div class="demo-block">
      <div class="demo-preview">${d.demo}</div>
      <pre class="demo-code">${d.code.replace(/</g, '&lt;')}</pre>
    </div>
    <h2>API</h2>
    <table class="api">
      <thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead>
      <tbody>${apiRows}</tbody>
    </table>
  `
  links.forEach((a) => a.classList.toggle('active', a.dataset.comp === key))
}
links.forEach((a) => (a.onclick = () => show(a.dataset.comp)))
show('button')
