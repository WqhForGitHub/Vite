import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <Link to="/">回到首页</Link>
    </div>
  )
}
