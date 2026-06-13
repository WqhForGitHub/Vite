import i18n from 'virtual:i18n'

function render() {
  document.querySelector('#title').textContent = i18n.t('title')
  document.querySelector('#msg').textContent = i18n.t('hello')
}
render()

document.querySelector('#zh').onclick = () => {
  i18n.setLocale('zh-CN')
  render()
}
document.querySelector('#en').onclick = () => {
  i18n.setLocale('en-US')
  render()
}
document.querySelector('#ja').onclick = () => {
  i18n.setLocale('ja-JP')
  render()
}

console.log('available locales:', i18n.locales)
