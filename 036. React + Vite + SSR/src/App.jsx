import { useState } from 'react'

export default function App({ url }) {
  const [count, setCount] = useState(0)
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <h1>React + Vite + SSR</h1>
      <p>
        请求 URL: <code>{url}</code>
      </p>
      <p>服务端渲染时间：{new Date().toLocaleTimeString()}</p>
      <button onClick={() => setCount((c) => c + 1)}>客户端 hydration 后可点击：{count}</button>
    </div>
  )
}
