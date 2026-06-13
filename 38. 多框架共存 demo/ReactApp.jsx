import { useState } from 'react'

export default function ReactApp() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>这是一个 React 组件。</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        style={{ padding: '0.4rem 0.8rem', background: '#61dafb', border: 0, cursor: 'pointer' }}
      >
        React count: {count}
      </button>
    </div>
  )
}
