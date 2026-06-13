/**
 * 多主题切换核心逻辑
 * 思路：
 *  1. 通过 <html data-theme="xxx"> 切换主题
 *  2. 选择持久化到 localStorage
 *  3. 支持「跟随系统」自动模式：监听 prefers-color-scheme
 */

const STORAGE_KEY = 'app-theme'
const AUTO_KEY = 'app-theme-auto'
const VALID_THEMES = ['light', 'dark', 'ocean', 'forest', 'sunset']

const html = document.documentElement
const curThemeEl = document.getElementById('cur-theme')
const autoBtn = document.getElementById('auto-btn')
const themeBtns = document.querySelectorAll('.theme-picker .theme-btn[data-theme]')

// 应用主题
function applyTheme(name) {
  if (!VALID_THEMES.includes(name)) name = 'light'
  html.setAttribute('data-theme', name)
  if (curThemeEl) curThemeEl.textContent = name
  // 更新按钮高亮
  themeBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === name)
  })
}

// 自动模式：跟随系统
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
function applyAuto() {
  const isDark = mediaQuery.matches
  applyTheme(isDark ? 'dark' : 'light')
}

// 初始化
function init() {
  const isAuto = localStorage.getItem(AUTO_KEY) === '1'
  if (isAuto) {
    applyAuto()
    autoBtn?.classList.add('active')
  } else {
    const saved = localStorage.getItem(STORAGE_KEY) || 'light'
    applyTheme(saved)
  }

  // 监听系统主题变化
  mediaQuery.addEventListener('change', () => {
    if (localStorage.getItem(AUTO_KEY) === '1') applyAuto()
  })
}

// 用户点击具体主题按钮：取消自动模式
themeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.theme
    localStorage.setItem(STORAGE_KEY, t)
    localStorage.removeItem(AUTO_KEY)
    autoBtn?.classList.remove('active')
    applyTheme(t)
  })
})

// 自动模式按钮
autoBtn?.addEventListener('click', () => {
  const isAuto = localStorage.getItem(AUTO_KEY) === '1'
  if (isAuto) {
    localStorage.removeItem(AUTO_KEY)
    autoBtn.classList.remove('active')
  } else {
    localStorage.setItem(AUTO_KEY, '1')
    autoBtn.classList.add('active')
    applyAuto()
  }
})

init()

console.log('[ThemeSwitch] 已初始化，支持主题：', VALID_THEMES.join(', '))
