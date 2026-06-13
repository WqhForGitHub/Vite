import { defineConfig } from 'vite'

// Rollup plugin 使用 demo
// Vite 兼容大多数 Rollup 插件，可放在 plugins 数组中

// 一个简单的自定义 Rollup 插件：在打包后的入口文件顶部插入 banner
function bannerPlugin(text) {
  return {
    name: 'banner-plugin',
    // Rollup 钩子
    renderChunk(code, chunk) {
      if (chunk.isEntry) {
        return `/* ${text} */\n${code}`
      }
      return null
    },
  }
}

// 一个简单的字符串替换插件
function replacePlugin(map) {
  return {
    name: 'replace-plugin',
    transform(code, id) {
      if (!/\.(js|ts)$/.test(id)) return null
      let result = code
      for (const [key, value] of Object.entries(map)) {
        result = result.replaceAll(key, value)
      }
      return { code: result, map: null }
    },
  }
}

export default defineConfig({
  plugins: [
    bannerPlugin(`Built at ${new Date().toISOString()}`),
    replacePlugin({
      __APP_VERSION__: JSON.stringify('1.0.0'),
    }),
  ],
})
