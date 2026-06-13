import { sum } from 'lodash-es'
import dayjs from 'dayjs'

document.getElementById('app').innerHTML = `
  <p>sum: ${sum([1, 2, 3, 4])}</p>
  <p>now: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>
`
