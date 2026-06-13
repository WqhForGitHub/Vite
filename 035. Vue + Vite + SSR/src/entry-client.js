import { createApp } from './main.js'

// 客户端入口：hydrate 服务端已渲染的 HTML
const { app } = createApp()
app.mount('#app')
