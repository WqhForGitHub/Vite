import { defineConfig } from 'vite'

// 一个最小化的"原子化 CSS"插件（演示 UnoCSS / Tailwind 的核心思想）
// - 扫描代码中使用到的工具类（如 m-4, p-2, text-red, bg-blue）
// - 生成一个虚拟 css 模块 virtual:atomic.css
// 真实场景请使用 @unocss/vite 或 tailwindcss + @tailwindcss/vite
function atomicCssPlugin() {
  const virtualId = 'virtual:atomic.css'
  const resolvedId = '\0' + virtualId

  // 简单规则
  const rules = [
    [/^m-(\d+)$/, (m) => `margin:${m[1] * 4}px;`],
    [/^p-(\d+)$/, (m) => `padding:${m[1] * 4}px;`],
    [/^text-(red|green|blue|black|white)$/, (m) => `color:${m[1]};`],
    [/^bg-(red|green|blue|black|white|gray)$/, (m) => `background-color:${m[1]};`],
    [/^text-(\d+)$/, (m) => `font-size:${m[1]}px;`],
    [/^rounded-(\d+)$/, (m) => `border-radius:${m[1]}px;`],
  ]

  const used = new Set()

  return {
    name: 'atomic-css-plugin',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id === resolvedId) {
        let css = ''
        for (const cls of used) {
          for (const [re, fn] of rules) {
            const m = cls.match(re)
            if (m) {
              css += `.${cls.replace(/[^a-zA-Z0-9_-]/g, '\\$&')}{${fn(m)}}\n`
              break
            }
          }
        }
        return css
      }
    },
    transform(code, id) {
      if (!/\.(html|js|ts|jsx|tsx|vue)$/.test(id)) return null
      // 从 class="..." 中提取候选类名
      const re = /class\s*=\s*["']([^"']+)["']/g
      let m
      while ((m = re.exec(code))) {
        for (const c of m[1].split(/\s+/)) used.add(c)
      }
      return null
    },
    transformIndexHtml(html) {
      // 提取 index.html 中的 class
      const re = /class\s*=\s*["']([^"']+)["']/g
      let m
      while ((m = re.exec(html))) {
        for (const c of m[1].split(/\s+/)) used.add(c)
      }
      return html
    },
  }
}

export default defineConfig({
  plugins: [atomicCssPlugin()],
})
