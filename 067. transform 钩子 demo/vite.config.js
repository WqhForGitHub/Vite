import { defineConfig } from 'vite'

// transform 钩子：可以转换模块的源码
function transformPlugin() {
  return {
    name: 'transform-plugin',
    transform(code, id) {
      // 只处理 .js 文件，且不在 node_modules 中
      if (!id.endsWith('.js') || id.includes('node_modules')) return null

      // 把所有的 __VERSION__ 替换为版本号
      if (code.includes('__VERSION__')) {
        const transformed = code.replace(/__VERSION__/g, JSON.stringify('1.0.0'))
        console.log('[transform-plugin] transform:', id)
        return {
          code: transformed,
          map: null, // 没有 sourcemap
        }
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [transformPlugin()],
})
