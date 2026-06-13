import { render } from './app.js'

// SSR 入口：被 server.js 通过 ssrLoadModule 调用
export async function ssrRender(url) {
  const html = render()
  return { html }
}
