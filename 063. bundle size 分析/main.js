// 引入大体积依赖以观察 bundle 分布
import { debounce, throttle, cloneDeep } from 'lodash-es'

const handler = debounce(() => {
  console.log('debounced')
}, 200)

const onScroll = throttle(() => {
  console.log('scroll throttled')
}, 100)

window.addEventListener('click', handler)
window.addEventListener('scroll', onScroll)

const data = cloneDeep({ a: 1, b: { c: 2 } })
document.getElementById('app').innerText = JSON.stringify(data)
