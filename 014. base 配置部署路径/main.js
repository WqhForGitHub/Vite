import logoUrl from './logo.svg'

// import.meta.env.BASE_URL 会等于 vite.config.js 里的 base，或命令行 --base
const base = import.meta.env.BASE_URL
document.getElementById('base').textContent = base
document.getElementById('logo').src = logoUrl

// 引用 public 资源时，正确做法：拼接 BASE_URL（避免硬编码 '/'）
const pubUrl = `${base}favicon.svg`
document.getElementById('pub').textContent = pubUrl
