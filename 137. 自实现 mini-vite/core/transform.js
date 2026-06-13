// 模拟 mini-vite 的 transform 流程
// 真实 vite 使用 esbuild + plugin 流水线
export function transform(code, id) {
  let result = code
  // 模拟 .css 转 ESM
  if (code.includes(`import './style.css'`)) {
    result = result.replace(
      `import './style.css'`,
      `import './style.css?import' /* [mini-vite] css -> ESM module */`,
    )
  }
  // 注入 HMR client
  result = `/* [mini-vite] transform: ${id} */\nimport { createHotContext } from '/@vite/client'\nimport.meta.hot = createHotContext('${id}')\n${result}`
  return result
}
