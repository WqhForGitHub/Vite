import throttle from 'lodash-es/throttle'
import { sum } from 'lodash-es'
import dayjs from 'dayjs'

const log = throttle(() => {
  console.log('throttle tick:', dayjs().format('HH:mm:ss'))
}, 1000)

setInterval(log, 200)

document.getElementById('out').textContent = [
  `sum: ${sum([10, 20, 30])}`,
  `now: ${dayjs().format()}`,
  '已节流：每秒打印一次（看控制台）',
].join('\n')
