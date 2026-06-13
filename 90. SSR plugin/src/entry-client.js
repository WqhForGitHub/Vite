import { render } from './app.js'

// 客户端入口：注水
const app = document.getElementById('app')
// 这里简化为 innerHTML 替换；真实项目中通常是 hydrate
console.log('[client] hydrate, ssr html =', app.innerHTML)
