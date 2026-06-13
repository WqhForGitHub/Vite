import './style.css'
import { sum } from 'lodash-es'

document.getElementById('b').onclick = async () => {
  const m = await import('./pages/home.js')
  document.getElementById('out').textContent = m.show()
}
console.log('sum:', sum([1, 2, 3]))
