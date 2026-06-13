import { defineConfig } from 'vite'

// 演示一个插件的多个钩子（多阶段）执行情况
// 钩子大致顺序：
//   config -> configResolved -> options(rollup) -> buildStart
//   -> resolveId -> load -> transform -> ...
//   -> buildEnd -> closeBundle (build)
//   -> configureServer -> transformIndexHtml (dev)
function multiStagePlugin() {
  return {
    name: 'multi-stage-plugin',

    // 1. Vite 钩子：返回部分配置进行合并
    config(userConfig, env) {
      console.log('[1] config()', env.command, env.mode)
      return { define: { __FROM_PLUGIN__: '"hello"' } }
    },

    // 2. 配置解析完成
    configResolved(resolved) {
      console.log('[2] configResolved() command =', resolved.command)
    },

    // 3. dev 服务器创建后
    configureServer(server) {
      console.log('[3] configureServer()')
      server.middlewares.use('/_plugin_hello', (req, res) => {
        res.end('hello from plugin middleware')
      })
    },

    // 4. Rollup options
    options(opts) {
      console.log('[4] options() rollup options')
      return opts
    },

    // 5. build 开始
    buildStart() {
      console.log('[5] buildStart()')
    },

    // 6. 解析模块 id
    resolveId(id, importer) {
      if (id === 'virtual:hello') {
        console.log('[6] resolveId(virtual:hello)')
        return '\0virtual:hello'
      }
    },

    // 7. 加载虚拟模块
    load(id) {
      if (id === '\0virtual:hello') {
        console.log('[7] load(virtual:hello)')
        return `export const VIRTUAL = 'I am virtual'`
      }
    },

    // 8. 转换源码
    transform(code, id) {
      if (id.endsWith('main.js')) {
        console.log('[8] transform(main.js)')
      }
    },

    // 9. HTML 转换
    transformIndexHtml(html) {
      console.log('[9] transformIndexHtml()')
      return html.replace('__INJECT__', '<!-- 插件注入 -->')
    },

    // 10. build 结束
    buildEnd() {
      console.log('[10] buildEnd()')
    },

    // 11. 整个 bundle 结束
    closeBundle() {
      console.log('[11] closeBundle()')
    },
  }
}

export default defineConfig({
  plugins: [multiStagePlugin()],
  server: { port: 5194, open: true },
})
