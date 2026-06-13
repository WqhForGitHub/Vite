import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// 国际化插件：把 ./locales/*.json 打包成虚拟模块 virtual:i18n
function i18nPlugin() {
  const virtualId = 'virtual:i18n'
  const resolvedId = '\0' + virtualId
  return {
    name: 'i18n-plugin',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return null
      const dir = path.resolve(process.cwd(), 'locales')
      const messages = {}
      try {
        for (const f of fs.readdirSync(dir)) {
          if (!f.endsWith('.json')) continue
          const lang = path.basename(f, '.json')
          messages[lang] = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'))
        }
      } catch (e) {
        // ignore
      }

      return `
const messages = ${JSON.stringify(messages)}
let current = 'zh-CN'
export function setLocale(lang) {
  if (messages[lang]) current = lang
}
export function getLocale() { return current }
export function t(key) {
  const dict = messages[current] || {}
  return dict[key] ?? key
}
export const locales = Object.keys(messages)
export default { t, setLocale, getLocale, locales, messages }
`
    },
  }
}

export default defineConfig({
  plugins: [i18nPlugin()],
})
