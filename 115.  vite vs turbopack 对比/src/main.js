import { range, sum } from 'lodash-es'
import dayjs from 'dayjs'

const TAG = 'vite' // <- 修改这个字符串触发 HMR
const data = range(1, 10000)

document.getElementById('out').textContent = [
  `bundler tag = ${TAG}`,
  `length = ${data.length}`,
  `sum = ${sum(data)}`,
  `now = ${dayjs().format('HH:mm:ss.SSS')}`,
  `loaded at ${performance.now().toFixed(1)} ms`,
].join('\n')

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('[client] hmr accepted at', Date.now())
  })
}
