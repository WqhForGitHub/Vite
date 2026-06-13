# Demo 16 - HMR 基础

## 演示要点

- Vite **默认开启 HMR**，无需任何配置
- CSS 文件天然支持热更新（修改样式不刷新页面）
- JS 模块需要通过 `import.meta.hot.accept(...)` **声明可被热替换**，否则会整页刷新
- 框架插件（vue/react/svelte）已经在内部为组件做好了 accept 处理，你写业务代码时几乎无感

## 操作步骤

1. `npm install && npm run dev`
2. 多点几次 +1 按钮，让计数变成例如 5
3. 修改 `style.css` 颜色 → 样式立即变化，计数仍是 5
4. 修改 `message.js` 中的文字 → 文字变化，计数仍是 5
5. 修改 `main.js`（没有 accept 自身）→ 整页刷新，计数清零

## API 速查

```js
if (import.meta.hot) {
  import.meta.hot.accept() // 接受自身更新
  import.meta.hot.accept('./dep.js', (m) => {}) // 接受依赖更新
  import.meta.hot.dispose((data) => {}) // 旧模块卸载前清理
  import.meta.hot.invalidate() // 放弃热更新，回退为整页刷新
}
```
