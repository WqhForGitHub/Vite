import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

// hydrate：把服务端预渲染的 HTML 接管为可交互的 React 树
hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App url={location.pathname} />
  </React.StrictMode>,
)
