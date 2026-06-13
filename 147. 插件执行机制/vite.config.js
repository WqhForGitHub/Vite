import { defineConfig } from 'vite'

// 插件执行机制 demo
// 演示 4 个核心特性：
//  1) enforce: 'pre' | 'post' 的排序
//  2) apply: 'serve' | 'build' 的条件加载
//  3) 钩子调用顺序：config -> configResolved -> configureServer
//                  -> resolveId -> load -> transform -> transformIndexHtml
//  4) 多个插件 transform 钩子的「依次串联」
//
// 启动后查看终端日志即可看到每个钩子的触发顺序。
function makePlugin(name, opts = {}) {
  return {
    name,
    enforce: opts.enforce, // 'pre' | 'post' | undefined
    apply: opts.apply, // 'serve' | 'build' | undefined

    config(userConfig, { command }) {
      console.log(`[${name}] config (command=${command})`)
    },
    configResolved(resolved) {
      console.log(`[${name}] configResolved (mode=${resolved.mode})`)
    },
    configureServer(server) {
      console.log(`[${name}] configureServer`)
    },
    resolveId(source) {
      if (source === 'virtual:plugin-info') {
        console.log(`[${name}] resolveId: ${source}`)
        return '\0virtual:plugin-info'
      }
    },
    load(id) {
      if (id === '\0virtual:plugin-info') {
        console.log(`[${name}] load: virtual:plugin-info`)
        return `export const info = ${JSON.stringify({ from: name, time: Date.now() })}`
      }
    },
    transform(code, id) {
      if (id.endsWith('main.js')) {
        console.log(`[${name}] transform: main.js`)
        return {
          code: `// [transform by ${name}]\n${code}`,
          map: null,
        }
      }
    },
    transformIndexHtml(html) {
      console.log(`[${name}] transformIndexHtml`)
      return html.replace(
        '<!--PLUGIN_HOOK_INSERT-->',
        `<!--PLUGIN_HOOK_INSERT-->\n    <!-- injected by ${name} -->`,
      )
    },
    buildStart() {
      console.log(`[${name}] buildStart`)
    },
    buildEnd() {
      console.log(`[${name}] buildEnd`)
    },
  }
}

export default defineConfig({
  server: { port: 5147, open: true },
  plugins: [
    // 注册顺序：normal-A、pre-B、post-C、serve-only-D、build-only-E
    // 实际 transform 顺序：pre-B -> normal-A -> post-C
    makePlugin('normal-A'),
    makePlugin('pre-B', { enforce: 'pre' }),
    makePlugin('post-C', { enforce: 'post' }),
    makePlugin('serve-only-D', { apply: 'serve' }),
    makePlugin('build-only-E', { apply: 'build' }),
  ],
})
