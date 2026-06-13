// 模拟 import 重写：将裸模块路径重写为预构建路径
export function rewriteImports(code) {
  return code.replace(
    /import\s+([^'"]+)\s+from\s+['"]([^'"./][^'"]*)['"]/g,
    (m, names, mod) =>
      `import ${names} from '/node_modules/.vite/deps/${mod}.js' /* [mini-vite] bare -> deps */`,
  )
}
