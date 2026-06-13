// 浏览器请求的是同源的 /api/todos/1
// 经过 dev server 代理后，实际打到 https://jsonplaceholder.typicode.com/todos/1
document.getElementById('btn-api').addEventListener('click', async () => {
  const out = document.getElementById('api-out')
  out.textContent = 'loading...'
  try {
    const res = await fetch('/api/todos/1')
    const data = await res.json()
    out.textContent = JSON.stringify(data, null, 2)
  } catch (e) {
    out.textContent = 'Error: ' + e.message
  }
})

// 图片同样走代理
document.getElementById('img').src = '/img/240/120'
