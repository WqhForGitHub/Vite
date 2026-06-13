// 构建一个模拟的 ModuleGraph，参考 vite 的 ModuleNode：
// { id, url, importers:Set, importedModules:Set, transformResult, lastHMRTimestamp }

const graph = {
  '/main.js': { kind: 'entry', deps: ['/App.js', '/utils/log.js', 'vue'] },
  '/App.js': {
    kind: 'normal',
    deps: ['/components/Header.js', '/components/Footer.js', '/utils/log.js'],
  },
  '/components/Header.js': { kind: 'normal', deps: ['/utils/log.js'] },
  '/components/Footer.js': { kind: 'normal', deps: ['lodash-es'] },
  '/utils/log.js': { kind: 'normal', deps: [] },
  vue: { kind: 'dep', deps: [] },
  'lodash-es': { kind: 'dep', deps: [] },
}

// 转为 ModuleNode 形式（包含 importers）
function buildModuleGraph(g) {
  const nodes = {}
  for (const id of Object.keys(g)) {
    nodes[id] = { id, kind: g[id].kind, importedModules: g[id].deps, importers: [] }
  }
  for (const id of Object.keys(g)) {
    for (const dep of g[id].deps) {
      if (nodes[dep]) nodes[dep].importers.push(id)
    }
  }
  return nodes
}

const moduleGraph = buildModuleGraph(graph)
document.getElementById('json').textContent = JSON.stringify(moduleGraph, null, 2)

// 简易 canvas 力导向布局（固定坐标）
const positions = {
  '/main.js': [320, 60],
  '/App.js': [320, 180],
  '/components/Header.js': [140, 290],
  '/components/Footer.js': [340, 320],
  '/utils/log.js': [120, 410],
  vue: [520, 130],
  'lodash-es': [520, 380],
}
const colors = { entry: '#22c55e', normal: '#3b82f6', dep: '#f59e0b' }

const ctx = document.getElementById('cv').getContext('2d')
ctx.clearRect(0, 0, 640, 460)

// 边
ctx.strokeStyle = '#94a3b8'
ctx.lineWidth = 1.5
for (const id of Object.keys(graph)) {
  const [x1, y1] = positions[id]
  for (const dep of graph[id].deps) {
    const [x2, y2] = positions[dep]
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    // 箭头
    const angle = Math.atan2(y2 - y1, x2 - x1)
    ctx.beginPath()
    ctx.moveTo(x2 - 12 * Math.cos(angle - 0.3), y2 - 12 * Math.sin(angle - 0.3))
    ctx.lineTo(x2, y2)
    ctx.lineTo(x2 - 12 * Math.cos(angle + 0.3), y2 - 12 * Math.sin(angle + 0.3))
    ctx.stroke()
  }
}

// 节点
for (const id of Object.keys(graph)) {
  const [x, y] = positions[id]
  ctx.beginPath()
  ctx.arc(x, y, 22, 0, Math.PI * 2)
  ctx.fillStyle = colors[graph[id].kind]
  ctx.fill()
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#0f172a'
  ctx.font = '12px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(id.split('/').pop(), x, y + 38)
}

console.log('[ModuleGraph] 构建完成', moduleGraph)
