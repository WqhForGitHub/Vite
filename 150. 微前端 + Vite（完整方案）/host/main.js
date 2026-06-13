// Host 主应用入口
// 子应用注册表：URL 指向各子应用 dev server 的 ESM 入口
const registry = {
  app1: 'http://localhost:5151/src/bootstrap.js',
  app2: 'http://localhost:5152/src/bootstrap.js',
}

const container = document.getElementById('micro-app-container')
let currentApp = null

async function loadApp(name) {
  // 卸载旧应用
  if (currentApp) {
    try {
      await currentApp.unmount?.()
    } catch (e) {
      console.warn('[host] unmount error', e)
    }
    currentApp = null
    container.innerHTML = ''
  }

  if (!name) return

  const url = registry[name]
  if (!url) {
    container.textContent = `未找到子应用：${name}`
    return
  }

  console.log(`[host] loading ${name} from ${url}`)
  try {
    // 关键：通过 ESM 动态 import 远程加载子应用
    const mod = await import(/* @vite-ignore */ url)
    if (typeof mod.mount !== 'function') {
      throw new Error(`${name} 必须导出 mount 函数`)
    }
    await mod.mount(container, {
      hostName: 'host',
      appName: name,
      mountedAt: Date.now(),
    })
    currentApp = mod
  } catch (err) {
    console.error('[host] load failed', err)
    container.innerHTML = `
      <div class="error">
        <h3>加载子应用 ${name} 失败</h3>
        <p>请确认对应 dev server 已启动：</p>
        <pre>${err.message}</pre>
      </div>
    `
  }
}

document.querySelectorAll('button[data-app]').forEach((btn) => {
  btn.addEventListener('click', () => loadApp(btn.dataset.app))
})

console.log('[host] ready', registry)
