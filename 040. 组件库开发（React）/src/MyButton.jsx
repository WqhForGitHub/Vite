import './MyButton.css'

export function MyButton({ type = 'primary', size = 'medium', children, ...rest }) {
  const cls = `my-btn my-btn--${type} my-btn--${size}`
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
