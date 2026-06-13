async function call(url) {
  const out = document.querySelector('#out')
  out.textContent = 'Loading...'
  const res = await fetch(url)
  const data = await res.json()
  out.textContent = JSON.stringify(data, null, 2)
  console.log(url, data)
}
document.querySelector('#users').onclick = () => call('/mock/users')
document.querySelector('#products').onclick = () => call('/mock/products')
