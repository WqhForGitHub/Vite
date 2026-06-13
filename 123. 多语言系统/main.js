import zh from './locales/zh-CN.js'
import en from './locales/en-US.js'
import ja from './locales/ja-JP.js'

const messages = { 'zh-CN': zh, 'en-US': en, 'ja-JP': ja }
let current = localStorage.getItem('lang') || 'zh-CN'

function t(key) {
  return key.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : key), messages[current])
}

function apply() {
  document.documentElement.lang = current
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n)
  })
  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === current)
  })
}

document.querySelectorAll('.lang-switch button').forEach((b) => {
  b.onclick = () => {
    current = b.dataset.lang
    localStorage.setItem('lang', current)
    apply()
  }
})

apply()
