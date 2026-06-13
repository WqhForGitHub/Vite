import { defineConfig } from 'vite'
import fs from 'node:fs'

// SVG loader：支持以 ?raw / ?component 等查询参数加载 SVG
// import svg from './foo.svg?raw'        -> 字符串
// import { mount } from './foo.svg?component' -> 简单组件
function svgLoaderPlugin() {
  return {
    name: 'svg-loader',
    enforce: 'pre',
    load(id) {
      const [filepath, query] = id.split('?')
      if (!filepath.endsWith('.svg')) return null
      if (!query) return null

      const params = new URLSearchParams(query)
      const src = fs.readFileSync(filepath, 'utf-8')

      if (params.has('raw')) {
        return `export default ${JSON.stringify(src)}`
      }

      if (params.has('component')) {
        return `
const svg = ${JSON.stringify(src)}
export function mount(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el.innerHTML = svg
  return el.firstElementChild
}
export default { svg, mount }
`
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [svgLoaderPlugin()],
})
