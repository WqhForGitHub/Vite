import './style.css'
import { debounce, throttle, cloneDeep, merge } from 'lodash-es'

// 引入一些依赖让构建有内容可比较
const data = cloneDeep({ name: 'vite vs webpack', list: [1, 2, 3] })
const merged = merge({}, data, { extra: true })

const log = debounce(() => console.log(merged), 100)
const onScroll = throttle(() => console.log('scroll'), 200)

window.addEventListener('click', log)
window.addEventListener('scroll', onScroll)

document.getElementById('app').innerHTML = `<pre>${JSON.stringify(merged, null, 2)}</pre>`
