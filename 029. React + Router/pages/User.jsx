import { useParams, useNavigate } from 'react-router-dom'

export default function User() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <h2>User: {id}</h2>
      <button onClick={() => navigate('/')}>返回首页</button>
    </div>
  )
}
