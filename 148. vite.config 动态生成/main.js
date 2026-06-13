// __APP_INFO__ 由 vite.config.js 中 define 注入
/* global __APP_INFO__ */
console.log('VITE_API_BASE =', import.meta.env.VITE_API_BASE)
console.log('VITE_ENV_NAME =', import.meta.env.VITE_ENV_NAME)
console.log('__APP_INFO__  =', __APP_INFO__)

document.getElementById('info').textContent = JSON.stringify(__APP_INFO__, null, 2)
