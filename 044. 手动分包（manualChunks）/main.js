import { chunk } from 'lodash-es'
import { formatDate } from './src/utils/format.js'
import { add } from './src/utils/math.js'

const app = document.getElementById('app')
app.innerHTML = `
  <p>chunk: ${JSON.stringify(chunk([1, 2, 3, 4, 5], 2))}</p>
  <p>date: ${formatDate(new Date())}</p>
  <p>add(2,3): ${add(2, 3)}</p>
`
