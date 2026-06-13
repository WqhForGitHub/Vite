import { defineConfig } from 'vite'

// 最小的"stylelint 集成插件"：对 CSS 做简单检查
// 真实场景请使用 vite-plugin-stylelint
function tinyStylelintPlugin() {
  return {
    name: 'tiny-stylelint-plugin',
    transform(code, id) {
      if (!/\.(css|scss|less)$/.test(id)) return null
      const issues = []

      // 规则 1：禁用 !important
      const reImp = /!important/g
      let m
      while ((m = reImp.exec(code))) {
        const line = code.slice(0, m.index).split('\n').length
        issues.push({ rule: 'no-!important', line })
      }
      // 规则 2：颜色应该用小写
      const reColor = /#([A-F0-9]{3,6})\b/g
      while ((m = reColor.exec(code))) {
        const line = code.slice(0, m.index).split('\n').length
        issues.push({ rule: 'color-hex-case', line, value: '#' + m[1] })
      }
      // 规则 3：禁止 0px（应写 0）
      const re0 = /\b0px\b/g
      while ((m = re0.exec(code))) {
        const line = code.slice(0, m.index).split('\n').length
        issues.push({ rule: 'length-zero-no-unit', line })
      }

      if (issues.length) {
        const summary = issues
          .map((i) => `[${i.rule}] ${id}:${i.line}${i.value ? ' ' + i.value : ''}`)
          .join('\n')
        this.warn('\n' + summary + '\n')
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [tinyStylelintPlugin()],
})
