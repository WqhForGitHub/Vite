import { defineConfig } from 'vite'
import path from 'node:path'

// resolveId 钩子：自定义模块路径解析
// 把 import '@config' 解析到项目内的 config.js
function resolveIdPlugin() {
  return {
    name: 'resolve-id-plugin',
    resolveId(source, importer) {
      if (source === '@config') {
        const resolved = path.resolve(__dirname, 'config.js')
        console.log('[resolve-id-plugin]', source, '->', resolved)
        return resolved
      }
      // 把所有 fake: 开头的，解析成虚拟 id（让 load 处理）
      if (source.startsWith('fake:')) {
        return '\0' + source // 加 \0 表示虚拟模块
      }
      return null
    },
    load(id) {
      if (id.startsWith('\0fake:')) {
        const name = id.slice('\0fake:'.length)
        return `export default 'fake module: ${name}'`
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [resolveIdPlugin()],
})
