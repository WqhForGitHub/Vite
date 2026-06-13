// 简化的 AST 演示：
// - parse：源码 -> AST 节点数组
// - transform：移除 console.* 调用，箭头函数 -> 普通函数
// - generate：AST -> 源码

const $ = (id) => document.getElementById(id)
let ast = []

function parse(code) {
  // 极简伪 AST，仅按行解析为 Statement 节点
  return code
    .split('\n')
    .filter(Boolean)
    .map((line, i) => {
      const t = line.trim()
      let type = 'ExpressionStatement'
      if (t.startsWith('const ') || t.startsWith('let ') || t.startsWith('var '))
        type = 'VariableDeclaration'
      if (/console\.(log|warn|error|info)/.test(t)) type = 'ConsoleCall'
      if (/=>/.test(t)) type += '+ArrowFunction'
      return { id: i, type, raw: line }
    })
}

function transform(nodes) {
  return nodes
    .filter((n) => n.type !== 'ConsoleCall') // 移除 console
    .map((n) => {
      if (n.type.includes('ArrowFunction')) {
        const replaced = n.raw.replace(/\(([^)]*)\)\s*=>\s*([^{].*)$/, 'function($1) { return $2 }')
        return { ...n, raw: replaced, type: n.type.replace('+ArrowFunction', '+Transformed') }
      }
      return n
    })
}

function generate(nodes) {
  return nodes.map((n) => n.raw).join('\n')
}

$('parse').addEventListener('click', () => {
  ast = parse($('input').value)
  $('ast').textContent = JSON.stringify(ast, null, 2)
})

$('transform').addEventListener('click', () => {
  if (!ast.length) ast = parse($('input').value)
  ast = transform(ast)
  $('ast').textContent = JSON.stringify(ast, null, 2)
})

$('generate').addEventListener('click', () => {
  $('output').textContent = generate(ast)
})

// 默认展示
ast = parse($('input').value)
$('ast').textContent = JSON.stringify(ast, null, 2)
$('output').textContent = '点击上方按钮按顺序执行 Parse → Transform → Generate'
