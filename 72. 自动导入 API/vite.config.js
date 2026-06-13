import { defineConfig } from 'vite'

// 自动导入 API：在源码中直接使用 ref / reactive / useState 等，不用 import
// 这里实现一个最小版本：扫到使用，自动在文件顶部插入 import
function autoImportPlugin(options = {}) {
  // 配置：哪些 API 来自哪个模块
  const imports = options.imports || {
    // 模拟一些 API
    h: 'virtual:auto-imports',
    ref: 'virtual:auto-imports',
    reactive: 'virtual:auto-imports',
    useState: 'virtual:auto-imports',
  }

  // 反向索引：module -> [name1, name2]
  const byModule = {}
  for (const name of Object.keys(imports)) {
    const mod = imports[name]
    if (!byModule[mod]) byModule[mod] = []
    byModule[mod].push(name)
  }

  return {
    name: 'auto-import-plugin',
    resolveId(id) {
      if (id === 'virtual:auto-imports') return '\0virtual:auto-imports'
    },
    load(id) {
      if (id === '\0virtual:auto-imports') {
        return `
export const ref = (v) => ({ value: v })
export const reactive = (o) => o
export const h = (tag, props, children) => ({ tag, props, children })
export const useState = (v) => [v, (nv) => console.log('setState', nv)]
`
      }
    },
    transform(code, id) {
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) return null
      if (id.includes('node_modules')) return null
      if (id.startsWith('\0')) return null

      const used = new Set()
      for (const name of Object.keys(imports)) {
        const re = new RegExp(`\\b${name}\\b`)
        if (re.test(code)) used.add(name)
      }
      if (used.size === 0) return null

      const groups = {}
      for (const name of used) {
        const mod = imports[name]
        if (!groups[mod]) groups[mod] = []
        groups[mod].push(name)
      }

      let header = ''
      for (const mod of Object.keys(groups)) {
        header += `import { ${groups[mod].join(', ')} } from '${mod}'\n`
      }
      return { code: header + code, map: null }
    },
  }
}

export default defineConfig({
  plugins: [autoImportPlugin()],
})
