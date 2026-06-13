import { component$, useSignal, $ } from '@builder.io/qwik'

export const App = component$(() => {
  const count = useSignal(0)
  const name = useSignal('Qwik')

  const increment = $(() => {
    count.value++
  })

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
      <h1>Hello {name.value} + Vite!</h1>
      <button onClick$={increment}>count: {count.value}</button>
      <p style={{ marginTop: '1rem' }}>
        Qwik 通过<strong>可恢复性</strong>实现极致启动性能。
      </p>
      <input
        value={name.value}
        onInput$={(e) => (name.value = e.target.value)}
        style={{ padding: '0.4rem' }}
      />
    </div>
  )
})
