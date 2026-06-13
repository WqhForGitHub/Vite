import { sum, range } from 'lodash-es'

const data = range(1, 1000)
document.getElementById('out').textContent = [
  `data.length = ${data.length}`,
  `sum = ${sum(data)}`,
  `bundler = ${import.meta.env ? 'vite' : 'webpack'}`,
  `loaded at ${performance.now().toFixed(1)} ms`,
].join('\n')
