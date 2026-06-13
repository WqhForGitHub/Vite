import { useCounterStore, useThemeStore } from './store.js'

function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()
  return (
    <div className="card">
      <h3>Counter: {count}</h3>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

function Display() {
  // 选择器订阅，避免无关更新
  const count = useCounterStore((s) => s.count)
  return (
    <p>
      另一个组件读取同一个 count: <b>{count}</b>
    </p>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useThemeStore()
  return (
    <div className="card">
      <p>当前主题: {theme}</p>
      <button onClick={toggle}>切换主题</button>
    </div>
  )
}

export default function App() {
  const theme = useThemeStore((s) => s.theme)
  return (
    <div className={`container ${theme}`}>
      <h1>React + Zustand Demo</h1>
      <Counter />
      <Display />
      <ThemeToggle />
    </div>
  )
}
