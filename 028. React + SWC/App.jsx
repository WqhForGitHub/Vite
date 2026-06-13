import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="container">
      <h1>React + SWC Demo</h1>
      <p>使用 @vitejs/plugin-react-swc 进行 JSX 编译，速度更快</p>
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
      <p>
        修改 <code>App.jsx</code> 试试 Fast Refresh
      </p>
    </div>
  )
}
