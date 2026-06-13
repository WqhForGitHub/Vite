import { defineConfig } from 'vite'
import fs from 'node:fs'

// 简单的 Markdown 转组件插件（不依赖外部库，自己写一个最小 md->html 转换）
function tinyMarkdown(src) {
  return (
    src
      // 转义
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // 标题
      .replace(/^###### (.*)$/gm, '<h6>$1</h6>')
      .replace(/^##### (.*)$/gm, '<h5>$1</h5>')
      .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      // 粗体/斜体
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // 行内代码
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // 段落
      .split(/\n\n+/)
      .map((block) => {
        if (/^<h[1-6]/.test(block.trim())) return block
        return '<p>' + block.trim().replace(/\n/g, '<br/>') + '</p>'
      })
      .join('\n')
  )
}

function markdownToComponent() {
  return {
    name: 'markdown-to-component',
    transform(_code, id) {
      if (!id.endsWith('.md')) return null
      const src = fs.readFileSync(id, 'utf-8')
      const html = tinyMarkdown(src)
      const code = `
const html = ${JSON.stringify(html)}
export function mount(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el.innerHTML = html
  return el
}
export default { html, mount }
`
      return { code, map: null }
    },
  }
}

export default defineConfig({
  plugins: [markdownToComponent()],
  assetsInclude: ['**/*.md'],
})
