// 通用渲染函数（同构）
export function render() {
  return `
    <p>这段 HTML 是在 <strong>服务端</strong> 渲染出来的（时间戳：${Date.now()}）</p>
    <p>客户端注水（hydrate）后会在控制台输出一行日志。</p>
  `
}
