import './style.css'

// =============================================================
//  import.meta.env 演示
// =============================================================
//
//   import.meta.env 是 Vite 在客户端代码里注入的一个对象，
//   既包含 Vite 内置变量，也包含 .env 文件里以 VITE_ 开头的自定义变量
//
// =============================================================

const env = import.meta.env

// ---- 1. Vite 内置变量 ----
const builtin = {
  MODE: env.MODE, // 当前模式（development / production / staging…）
  DEV: env.DEV, // 是否是开发环境（boolean）
  PROD: env.PROD, // 是否是生产环境（boolean）
  SSR: env.SSR, // 是否是 SSR 构建（boolean）
  BASE_URL: env.BASE_URL, // 应用部署的公共基础路径
}

// ---- 2. 自定义变量（必须以 VITE_ 开头）----
const custom = {
  VITE_APP_TITLE: env.VITE_APP_TITLE,
  VITE_APP_VERSION: env.VITE_APP_VERSION,
  VITE_API_BASE: env.VITE_API_BASE,
  VITE_FEATURE_FLAG: env.VITE_FEATURE_FLAG,
}

// ---- 3. 没有 VITE_ 前缀的（被 Vite 过滤，拿不到）----
const filtered = {
  SECRET: env.SECRET, // undefined
}

// ---- 4. import.meta.url（不属于 env，但常一起用）----
const moduleUrl = import.meta.url

// ---- 5. vite.config.js 通过 define 注入的全局常量 ----
//      这不是 import.meta.env 的一部分，但同样是"编译期注入"机制
const defined = {
  __APP_NAME__: typeof __APP_NAME__ !== 'undefined' ? __APP_NAME__ : '(undefined)',
  __APP_BUILD_TIME__:
    typeof __APP_BUILD_TIME__ !== 'undefined' ? __APP_BUILD_TIME__ : '(undefined)',
}

// ---- 6. 使用 import.meta.env 做条件分支（构建时会被 tree-shake 掉）----
if (import.meta.env.DEV) {
  console.log('[dev only] 仅开发环境会执行的代码 ✅')
}
if (import.meta.env.PROD) {
  console.log('[prod only] 仅生产环境会执行的代码')
}

// =============================================================
//  渲染
// =============================================================

const app = document.querySelector('#app')

const renderTable = (title, obj) => `
  <h3>${title}</h3>
  <table>
    <thead><tr><th>Key</th><th>Value</th><th>Type</th></tr></thead>
    <tbody>
      ${Object.entries(obj)
        .map(
          ([k, v]) =>
            `<tr>
              <td><code>${k}</code></td>
              <td>${v === undefined ? '<i>undefined</i>' : String(v)}</td>
              <td>${typeof v}</td>
            </tr>`,
        )
        .join('')}
    </tbody>
  </table>
`

app.innerHTML = `
  <div class="container">
    <h1>${env.VITE_APP_TITLE} <small>v${env.VITE_APP_VERSION}</small></h1>
    <p>当前模式：<strong class="${env.DEV ? 'tag-dev' : 'tag-prod'}">${env.MODE}</strong></p>

    ${renderTable('① Vite 内置变量', builtin)}
    ${renderTable('② 自定义变量（VITE_ 前缀）', custom)}
    ${renderTable('③ 没有 VITE_ 前缀的变量（被 Vite 过滤）', filtered)}
    ${renderTable('④ import.meta.url', { 'import.meta.url': moduleUrl })}
    ${renderTable('⑤ vite.config.js 中 define 注入的常量', defined)}

    <h3>⑥ 完整的 import.meta.env 对象</h3>
    <pre>${JSON.stringify(env, null, 2)}</pre>
  </div>
`
