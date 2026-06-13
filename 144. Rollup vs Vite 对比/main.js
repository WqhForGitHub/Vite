const rows = [
  ['核心定位', '打包器（Bundler）', '构建工具链（Dev Server + Builder）'],
  ['Dev 模式', '需要打包后预览（rollup -w）', '免打包，浏览器原生 ESM 按需加载'],
  ['HMR 支持', '❌ 原生不支持', '✅ 内置 HMR API'],
  ['依赖处理', '通过插件转 ESM', 'esbuild 预构建（10~100x 更快）'],
  ['底层打包器', '自身（@rollup/*）', '生产环境复用 Rollup'],
  ['速度', '中等', 'Dev 极快 / Build 与 Rollup 相当'],
  ['典型用途', 'Library 打包（vue, react, three.js 都在用）', '现代 Web 应用开发'],
  ['配置文件', 'rollup.config.js', 'vite.config.js（含 rollupOptions）'],
  ['插件兼容', 'Rollup 插件', 'Rollup 插件 + Vite 专属插件'],
  ['代码分割', '✅ 优秀', '✅ 继承 Rollup 能力'],
  ['Tree Shaking', '✅ 业界领先', '✅ 通过 Rollup'],
  ['CSS / 静态资源', '需插件', '✅ 开箱即用'],
]

document.getElementById('rows').innerHTML = rows
  .map(
    (r) => `
  <tr>
    <td><b>${r[0]}</b></td>
    <td><span class="tag tag-r">Rollup</span> ${r[1]}</td>
    <td><span class="tag tag-v">Vite</span> ${r[2]}</td>
  </tr>
`,
  )
  .join('')

// 冷启动耗时示意
const bench = [
  { name: 'Webpack 5 (1000 modules)', ms: 14000, color: '#3b82f6' },
  { name: 'Rollup -w (1000 modules)', ms: 8000, color: '#ef4444' },
  { name: 'Vite 5 dev (1000 modules)', ms: 350, color: '#06b6d4' },
]
const max = Math.max(...bench.map((b) => b.ms))
document.getElementById('bench').innerHTML = bench
  .map(
    (b) => `
  <div>
    <small><b>${b.name}</b> — ${b.ms} ms</small>
    <div class="bar-wrap">
      <div class="bar" style="width:${((b.ms / max) * 100).toFixed(1)}%; background:${b.color}">${b.ms} ms</div>
    </div>
  </div>
`,
  )
  .join('')

console.log(
  '[Rollup vs Vite] Vite 生产构建底层 = Rollup，可在 vite.config.js 的 build.rollupOptions 中直接配置 Rollup 选项',
)
