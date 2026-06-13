import { sum } from 'lodash-es'

const t = performance.now()
document.getElementById('out').textContent = [
  `client load at ${t.toFixed(1)} ms`,
  `sum demo: ${sum([1, 2, 3])}`,
].join('\n')
