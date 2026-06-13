import React from 'react'
import { createRoot } from 'react-dom/client'
import { MyButton, MyCard } from './src/index.js'

function Demo() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <h1>React 组件库 Playground</h1>
      <MyCard title="按钮示例">
        <MyButton type="primary" onClick={() => alert('hi')}>
          Primary
        </MyButton>{' '}
        <MyButton type="danger" size="small">
          Danger Small
        </MyButton>{' '}
        <MyButton type="ghost" size="large">
          Ghost Large
        </MyButton>
      </MyCard>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<Demo />)
