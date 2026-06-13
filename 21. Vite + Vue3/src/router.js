// 简易 hash 路由
export function createRouter(routes) {
  function render() {
    const path = location.hash.replace(/^#/, '') || '/'
    const handler =
      routes[path] ||
      (() => {
        document.querySelector('#view').innerHTML = '<h2>404 Not Found</h2>'
      })
    handler()
  }
  window.addEventListener('hashchange', render)
  window.addEventListener('load', render)
  render()
}
