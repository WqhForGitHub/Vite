import './style.css'
import { greet } from './lib.js'

console.log(greet('Inspect'))
document.body.appendChild(
  Object.assign(document.createElement('p'), { textContent: greet('Vite') }),
)
