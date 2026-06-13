let count = 0

export function renderCounter(el) {
  el.innerHTML = `<button id="btn">count is ${count}</button>`
  el.querySelector('#btn').addEventListener('click', () => {
    count++
    renderCounter(el)
  })
}
