import { setup } from './counter.js'

setup(document.getElementById('counter'))

if (import.meta.hot) {
  import.meta.hot.accept('./counter.js', (newMod) => {
    newMod.setup(document.getElementById('counter'))
    // 通知插件 HMR 应用完成
    import.meta.hot.send('hmr:applied', { module: 'counter.js', t: performance.now() })
  })

  import.meta.hot.on('hmr:start', (payload) => {
    console.log('[client] hmr:start', payload)
  })
}
