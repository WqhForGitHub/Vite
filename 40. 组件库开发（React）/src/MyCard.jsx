import './MyCard.css'

export function MyCard({ title, children }) {
  return (
    <div className="my-card">
      {title && <header className="my-card__header">{title}</header>}
      <div className="my-card__body">{children}</div>
    </div>
  )
}
