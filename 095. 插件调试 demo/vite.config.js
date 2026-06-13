import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

// 插件调试 demo:
// 1) DEBUG=vite:* npm run dev    -> 查看 vite 内部 debug 日志
// 2) vite-plugin-inspect: 浏览器访问 /__inspect/ 查看每个模块的转换链
// 3) 自定义 logger 拦截构建/HMR 日志
function debugPlugin() {
  return {
    name: 'plugin-debug',
    configResolved(config) {
      // 打印解析后的所有插件名（顺序）
      console.log('\n[debug] 已注册插件顺序：')
      config.plugins.forEach((p, i) => console.log(`  ${i}. ${p.name}`))
    },
    transform(code, id) {
      if (id.includes('node_modules')) return
      console.log('[debug] transform:', id, 'size=', code.length)
    },
    handleHotUpdate(ctx) {
      console.log('[debug] hot update:', ctx.file)
    },
  }
}

export default defineConfig({
  plugins: [
    debugPlugin(),
    Inspect(), // 访问 /__inspect/
  ],

  // 自定义 logger
  customLogger: undefined, // 可传入自定义 logger 实现
  logLevel: 'info', // 'silent' | 'error' | 'warn' | 'info'
  clearScreen: false, // 启动时不清屏，保留所有日志

  server: {
    port: 5195,
    open: true,
  },
})
