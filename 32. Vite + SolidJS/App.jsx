import { createSignal, createMemo, For } from 'solid-js'

export default function App() {
  const [count, setCount] = createSignal(0)
  const [items, setItems] = createSignal(['Solid', 'Vite'])
  const doubled = createMemo(() => count() * 2)

  return (
    <div class="container">
      <h1>SolidJS + Vite Demo</h1>
      <button onClick={() => setCount(count() + 1)}>
        count: {count()}（双倍：{doubled()}）
      </button>
      <ul>
        <For each={items()}>{(item) => <li>{item}</li>}</For>
      </ul>
      <button onClick={() => setItems([...items(), `Item ${items().length}`])}>添加项</button>
    </div>
  )
}
