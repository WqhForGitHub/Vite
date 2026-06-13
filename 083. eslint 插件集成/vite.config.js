import { defineConfig } from 'vite'
import fs from 'node:fs'

// 一个最小的"ESLint 集成插件"：在 transform 钩子中对源码做简单 lint
// 真实场景请使用 vite-plugin-eslint 或 @nabla/vite-plugin-eslint
function tinyEslintPlugin(options = {}) {
  const include = options.include || /\.(js|jsx|ts|tsx)$/
  return {
    name: 'tiny-eslint-plugin',
    transform(code, id) {
      if (id.includes('node_modules')) return null
      if (!include.test(id)) return null

      const issues = []
      // 规则 1：禁用 var
      const reVar = /\bvar\b/g
      let m
      while ((m = reVar.exec(code))) {
        const line = code.slice(0, m.index).split('\n').length
        issues.push({ rule: 'no-var', line, message: '请使用 let/const 代替 var' })
      }
      // 规则 2：禁止 console.log（仅在 build 时报错）
      const reLog = /console\.log\(/g
      while ((m = reLog.exec(code))) {
        const line = code.slice(0, m.index).split('\n').length
        issues.push({ rule: 'no-console-log', line, message: '请勿使用 console.log（warning）' })
      }

      if (issues.length) {
        const summary = issues.map((i) => `[${i.rule}] ${id}:${i.line}  ${i.message}`).join('\n')
        // 使用 this.warn 给出告警，不阻塞
        this.warn('\n' + summary + '\n')
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [tinyEslintPlugin()],
})
