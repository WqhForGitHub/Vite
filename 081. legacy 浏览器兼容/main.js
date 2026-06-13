// 使用一些 ES2020+ 语法
const obj = { a: 1, b: 2 }
const { a, ...rest } = obj
const sum = [1, 2, 3].reduce((s, x) => s + x, 0)

document.querySelector('#msg').textContent = `a=${a}, rest=${JSON.stringify(rest)}, sum=${sum}`

console.log('legacy demo loaded')
