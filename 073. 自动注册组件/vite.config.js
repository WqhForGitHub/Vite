import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// 自动注册组件：扫描 ./components/*.js，把它们生成一个虚拟模块
function autoRegisterPlugin() {
  const virtualId = 'virtual:components'
  const resolvedId = '\0' + virtualId

  return {
    name: 'auto-register-plugin',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id === resolvedId) {
        const dir = path.resolve(process.cwd(), 'components')
        let files = []
        try {
          files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'))
        } catch (e) {
          files = []
        }

        const imports = files.map((f, i) => `import c${i} from '/components/${f}'`).join('\n')

        const entries = files
          .map((f, i) => {
            const name = path.basename(f, '.js')
            return `  '${name}': c${i}`
          })
          .join(',\n')

        return `${imports}
export const components = {
${entries}
}
export function register(target) {
  for (const [name, comp] of Object.entries(components)) {
    const el = document.createElement('div')
    el.setAttribute('data-component', name)
    el.innerHTML = comp.render ? comp.render() : ''
    target.appendChild(el)
  }
}
export default components
`
      }
    },
  }
}

export default defineConfig({
  plugins: [autoRegisterPlugin()],
})
