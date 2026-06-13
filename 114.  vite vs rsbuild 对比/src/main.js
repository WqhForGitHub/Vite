import { range, sum } from 'lodash-es'
import dayjs from 'dayjs'

const data = range(1, 5000)
document.getElementById('out').textContent = [
  `arr length = ${data.length}`,
  `sum = ${sum(data)}`,
  `now = ${dayjs().format()}`,
  `loaded at ${performance.now().toFixed(1)} ms`,
].join('\n')
