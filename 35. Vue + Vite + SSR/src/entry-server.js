import { renderToString } from 'vue/server-renderer'
import { createApp } from './main.js'

// 服务端入口：渲染为字符串
export async function render() {
  const { app } = createApp()
  const html = await renderToString(app)
  return { html }
}
