// 简易 import 分析器（基于正则；真实 vite 用 es-module-lexer 做词法级 O(n) 分析）
const STATIC_RE = /import\s+(?:[\w*{}\s,]*\s+from\s+)?['"]([^'"]+)['"]/g
const DYNAMIC_RE = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g

export function analyzeImports(code) {
  const staticImports = []
  const dynamicImports = []
  let m
  while ((m = STATIC_RE.exec(code))) staticImports.push(m[1])
  while ((m = DYNAMIC_RE.exec(code))) dynamicImports.push(m[1])
  return { staticImports, dynamicImports }
}

// 模拟 vite：将裸模块重写为 /node_modules/.vite/deps/xxx.js
export function rewriteBareImports(code) {
  return code
    .replace(
      /import\s+([^'"]*?)\s+from\s+['"]([^'"./][^'"]*)['"]/g,
      (_, names, mod) => `import ${names} from '/node_modules/.vite/deps/${mod}.js'`,
    )
    .replace(
      /import\s*\(\s*['"]([^'"./][^'"]*)['"]\s*\)/g,
      (_, mod) => `import('/node_modules/.vite/deps/${mod}.js')`,
    )
}
