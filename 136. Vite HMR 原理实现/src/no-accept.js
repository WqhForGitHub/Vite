/**
 * 没有声明 import.meta.hot.accept 的模块。
 * 当它发生变化时，HMR 会一直冒泡到入口（main.js），
 * 入口未对它 accept，所以最终会触发 full-reload（整页刷新）。
 */

export function mountNoAccept(el) {
  // 试着改下面的文字 → 浏览器会整页刷新
  el.innerHTML = `
    <p>👉 我是一段没有 accept 的文本。</p>
    <p class="muted">修改 <code>src/no-accept.js</code> 中的文案，将触发整页刷新。</p>
  `
}
