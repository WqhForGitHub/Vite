const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 7999, icon: '📱' },
  { id: 2, name: 'MacBook Air', price: 8999, icon: '💻' },
  { id: 3, name: 'AirPods Pro', price: 1899, icon: '🎧' },
  { id: 4, name: 'iPad Air', price: 4799, icon: '📱' },
  { id: 5, name: '智能手表', price: 2999, icon: '⌚' },
  { id: 6, name: '蓝牙音箱', price: 599, icon: '🔊' },
  { id: 7, name: '无线键盘', price: 399, icon: '⌨️' },
  { id: 8, name: '游戏鼠标', price: 299, icon: '🖱️' },
]

let cartCount = 0
const grid = document.getElementById('products')
grid.innerHTML = products
  .map(
    (p) => `
  <div class="product">
    <div class="img">${p.icon}</div>
    <h3>${p.name}</h3>
    <div class="price">¥${p.price}</div>
    <button data-id="${p.id}">加入购物车</button>
  </div>
`,
  )
  .join('')

grid.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    cartCount++
    document.getElementById('cart-count').textContent = cartCount
  }
})
