import { defineConfig } from 'vite'

// 虚拟模块：模块本身不存在于文件系统中，由插件提供内容
function virtualModulePlugin() {
  const virtualId = 'virtual:app-info'
  const resolvedId = '\0' + virtualId // 约定俗成：以 \0 前缀作为 resolved id

  return {
    name: 'virtual-module-plugin',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id === resolvedId) {
        return `
export const appName = 'My Vite App'
export const buildTime = ${JSON.stringify(new Date().toISOString())}
export const features = ['vite', 'virtual-module', 'esm']
export default { appName, buildTime, features }
`
      }
    },
  }
}

export default defineConfig({
  plugins: [virtualModulePlugin()],
})
