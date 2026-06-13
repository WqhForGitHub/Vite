// 服务端入口：返回字符串供 server.js 注入到 HTML 模板
import { createApp } from './app.js'

export function render(url) {
  const { html } = createApp(100)
  return { html }
}
