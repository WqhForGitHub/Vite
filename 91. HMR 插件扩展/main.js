import data from './data/info.json'

const out = document.getElementById('out')

function render() {
  out.textContent = JSON.stringify(data, null, 2)
}
render()

// HMR API：接受当前模块更新
if (import.meta.hot) {
  import.meta.hot.accept((newMod) => {
    console.log('[hmr] self update', newMod)
  })

  // 监听插件中 server.ws.send 发出的自定义事件
  import.meta.hot.on('data:update', (payload) => {
    console.log('[hmr] custom event data:update =>', payload)
    // 重新拉取 json
    fetch('/data/info.json?t=' + Date.now())
      .then((r) => r.json())
      .then((j) => {
        Object.assign(data, j)
        render()
      })
  })
}
