// 依赖预构建源码分析（基于 vite 5.x 源码理论流程）
const steps = [
  {
    title: '① 入口扫描 - scanImports()',
    file: 'packages/vite/src/node/optimizer/scan.ts',
    desc: '使用 esbuild 的 scan plugin 从 index.html 入口出发递归扫描所有 import，得出"裸模块"列表（如 vue / lodash-es / axios）。',
    code: `// 简化伪代码
async function scanImports(config) {
  const deps = {}
  await esbuild.build({
    entryPoints: [resolveEntries(config)],
    bundle: true,
    write: false,
    plugins: [esbuildScanPlugin(config, deps)]
  })
  return deps  // { vue: '/path/vue.js', lodash-es: '/path/...' }
}`,
  },
  {
    title: '② 计算 hash - getDepHash()',
    file: 'packages/vite/src/node/optimizer/index.ts',
    desc: '基于 lockfile / package.json / vite.config 计算 hash，与 .vite/deps/_metadata.json 中缓存比对。命中则跳过预构建。',
    code: `function getDepHash(config) {
  const content = JSON.stringify({
    mode: process.env.NODE_ENV,
    lockfileHash: hashLockfile(config),
    optimizeDeps: config.optimizeDeps
  })
  return createHash('sha256').update(content).digest('hex').slice(0, 8)
}`,
  },
  {
    title: '③ esbuild 打包 - runOptimizeDeps()',
    file: 'packages/vite/src/node/optimizer/index.ts',
    desc: '为每个裸模块单独打包成 ESM，输出到 node_modules/.vite/deps/。同时生成 metadata 用于 import 重写。',
    code: `await esbuild.build({
  absWorkingDir: process.cwd(),
  entryPoints: Object.values(deps),
  bundle: true,
  format: 'esm',
  target: 'esnext',
  splitting: true,
  sourcemap: true,
  outdir: 'node_modules/.vite/deps',
  metafile: true,
  plugins: [esbuildDepPlugin(...)]
})`,
  },
  {
    title: '④ 写入 metadata',
    file: 'node_modules/.vite/deps/_metadata.json',
    desc: '保存依赖到产物的映射，供后续 import 重写使用。',
    code: `{
  "hash": "abcdef12",
  "browserHash": "12345678",
  "optimized": {
    "vue": {
      "src": "../../vue/dist/vue.runtime.esm-bundler.js",
      "file": "vue.js",
      "fileHash": "ff00aa11",
      "needsInterop": false
    }
  }
}`,
  },
  {
    title: '⑤ import 重写 - importAnalysisPlugin',
    file: 'packages/vite/src/node/plugins/importAnalysis.ts',
    desc: '请求源码时，把 `import xx from "vue"` 重写为 `import xx from "/node_modules/.vite/deps/vue.js?v=12345678"`。',
    code: `// 在 transform 钩子中
return code.replace(
  /from ['"](vue)['"]/,
  \`from '/node_modules/.vite/deps/vue.js?v=\${browserHash}'\`
)`,
  },
  {
    title: '⑥ 缓存策略',
    file: '浏览器层 + 文件系统层',
    desc: '产物 URL 带 ?v=hash 查询参数，配合 HTTP Cache-Control: max-age=31536000,immutable 实现强缓存；hash 变化即令缓存失效。',
    code: `Cache-Control: max-age=31536000, immutable`,
  },
]

const benefits = [
  ['✅ CJS/UMD → ESM', '把不兼容浏览器的依赖转成原生 ESM'],
  ['✅ 减少请求数', 'lodash-es 600+ 文件 → 单文件，避免瀑布流请求'],
  ['✅ 二次启动秒开', '通过 hash + metadata 命中缓存，跳过预构建'],
  ['✅ 强缓存', '产物路径含 hash，配合 immutable 头部'],
]

const html =
  steps
    .map(
      (s) => `
  <div class="step">
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <p><code>${s.file}</code></p>
    <pre>${escape(s.code)}</pre>
  </div>
`,
    )
    .join('') +
  `
  <div class="step">
    <h3>🎯 收益总结</h3>
    <table>
      <thead><tr><th>能力</th><th>说明</th></tr></thead>
      <tbody>
        ${benefits.map((b) => `<tr><td>${b[0]}</td><td>${b[1]}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
`

document.getElementById('content').innerHTML = html

function escape(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
}
