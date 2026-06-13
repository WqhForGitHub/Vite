import { defineConfig } from 'vite'

// legacy 浏览器兼容
// 官方推荐使用 @vitejs/plugin-legacy。这里写一个最小演示版：
// - 在 build 时为 index.html 注入 nomodule 兜底脚本，并在浏览器不支持 ES Module 时提示
// - 配合 build.target 设置较低目标
function tinyLegacyPlugin() {
  return {
    name: 'tiny-legacy-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      // nomodule 兜底脚本：当浏览器不识别 type=module 时执行
      const fallback = `
  <script nomodule>
    document.body.innerHTML = '<h1>Your browser is too old, please upgrade.</h1>'
  </script>`
      return html.replace('</body>', fallback + '\n</body>')
    },
  }
}

export default defineConfig({
  plugins: [tinyLegacyPlugin()],
  build: {
    // 把 ES 目标降到 es2015，可被更多浏览器执行
    target: ['es2015', 'chrome58', 'firefox57', 'safari11'],
  },
})
