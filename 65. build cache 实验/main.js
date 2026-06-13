import { debounce } from 'lodash-es'
import dayjs from 'dayjs'

const log = debounce(() => {
  console.log('clicked at', dayjs().format('YYYY-MM-DD HH:mm:ss'))
}, 200)

document.getElementById('app').innerHTML = `
  <p>now: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>
  <button id="btn">click</button>
`
document.getElementById('btn').addEventListener('click', log)
