import { marked } from 'marked'

const input = document.getElementById('input')
const preview = document.getElementById('preview')

input.value = `# Markdown 编辑器

支持 **粗体**、*斜体*、\`代码\` 等语法。

## 功能特点

- 实时预览
- 工具栏快捷插入
- 基于 \`marked\` 解析

> 这是一段引用文本。

\`\`\`js
console.log('Hello Vite')
\`\`\`

[Vite 官网](https://vitejs.dev)
`

function update() {
  preview.innerHTML = marked.parse(input.value)
}
input.addEventListener('input', update)
document.querySelectorAll('.toolbar button').forEach((b) => {
  b.onclick = () => {
    const text = b.dataset.md
    const start = input.selectionStart
    input.setRangeText(text, start, input.selectionEnd, 'end')
    input.focus()
    update()
  }
})
update()
