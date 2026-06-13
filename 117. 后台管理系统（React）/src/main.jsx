import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import './style.css'

const Dashboard = () => (
  <div className="page">
    <h2>仪表盘</h2>
    <div className="cards">
      <div className="card">
        <h3>总用户</h3>
        <p>1024</p>
      </div>
      <div className="card">
        <h3>今日访问</h3>
        <p>256</p>
      </div>
      <div className="card">
        <h3>订单数</h3>
        <p>89</p>
      </div>
      <div className="card">
        <h3>收入</h3>
        <p>¥12,580</p>
      </div>
    </div>
  </div>
)

const Users = () => {
  const users = [
    { id: 1, name: '张三', email: 'zhang@x.com', role: 'Admin' },
    { id: 2, name: '李四', email: 'li@x.com', role: 'User' },
  ]
  return (
    <div className="page">
      <h2>用户管理</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>角色</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Settings = () => {
  const [name, setName] = React.useState('Vite Admin')
  return (
    <div className="page">
      <h2>系统设置</h2>
      <div className="panel">
        <p>
          站点名称：
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </p>
        <button onClick={() => alert('已保存：' + name)}>保存</button>
      </div>
    </div>
  )
}

const App = () => (
  <div className="layout">
    <aside className="sidebar">
      <h2>Admin</h2>
      <nav>
        <NavLink to="/" end>
          仪表盘
        </NavLink>
        <NavLink to="/users">用户管理</NavLink>
        <NavLink to="/settings">系统设置</NavLink>
      </nav>
    </aside>
    <main className="content">
      <header>
        <span>欢迎，Admin</span>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </main>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
