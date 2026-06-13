// 制造一些重复字符串，便于看到压缩比
const lorem = 'Vite makes building modern web apps faster. '.repeat(2000)
document.getElementById('out').textContent =
  `text length = ${lorem.length}\nfirst 100 chars: ${lorem.slice(0, 100)}...`

console.log('compression demo loaded')
