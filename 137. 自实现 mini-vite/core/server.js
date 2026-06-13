// 模拟 dev server 流水线
export function createServerSimulation(url) {
  const lines = [
    `[connect] GET ${url}`,
    `[middleware] resolveId -> ${url}`,
    `[plugin]  load(${url})`,
    `[plugin]  transform(${url})`,
    `[response] 200 OK  Content-Type: application/javascript`,
    `[hmr]     ws connected, watching ${url}`,
  ]
  return lines.join('\n')
}
