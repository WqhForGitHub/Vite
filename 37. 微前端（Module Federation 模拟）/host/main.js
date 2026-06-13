// 宿主入口：动态从远程 URL 加载模块
const REMOTE_URL = 'http://localhost:5174/widget.js'

let unmount = null
const target = document.getElementById('remote-mount')

document.getElementById('load').addEventListener('click', async () => {
  if (unmount) return
  // /* @vite-ignore */ 让 Vite 跳过对该动态 import 的静态分析
  const mod = await import(/* @vite-ignore */ REMOTE_URL)
  unmount = mod.mountWidget(target)
})

document.getElementById('unload').addEventListener('click', () => {
  if (unmount) {
    unmount()
    unmount = null
  }
})
