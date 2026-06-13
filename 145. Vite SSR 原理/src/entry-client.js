// 客户端入口：在浏览器中 hydrate 已经服务端渲染好的 DOM
import { hydrate } from './app.js'

const root = document.getElementById('app')
hydrate(root)

console.log('[client] hydrated at', new Date().toISOString())
