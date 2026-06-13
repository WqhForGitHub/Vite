import { formatDate, sum, VERSION } from '@demo/shared'

const data = {
  shared_version: VERSION,
  now: formatDate(),
  sum: sum([1, 2, 3, 4, 5]),
}

console.log(data)
document.getElementById('out').textContent = JSON.stringify(data, null, 2)
