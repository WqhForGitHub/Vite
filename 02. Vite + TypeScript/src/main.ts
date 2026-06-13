import './style.css'
import { createCounter } from './counter'
import type { User } from './types'

const user: User = {
  id: 1,
  name: 'Vite',
  role: 'admin',
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div class="container">
    <h1>Vite + TypeScript</h1>
    <p>当前用户: <strong>${user.name}</strong> (${user.role})</p>
    <button id="counter" type="button"></button>
  </div>
`

const button = document.querySelector<HTMLButtonElement>('#counter')!
createCounter(button)
