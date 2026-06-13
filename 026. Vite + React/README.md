# 26. 热更新（HMR）基础

演示 Vite 开发服务器的热模块替换（Hot Module Replacement）。

## 启动

```bash
npm install
npm run dev
```

## 试试这些操作

1. 改 `style.css` 颜色 → 立刻看到样式生效，**无页面刷新**
2. 改 `message.js` 里的文本 → 模块热替换，控制台会打印 `[HMR] 模块更新，重新渲染`
3. 改 `counter.js` → 计数器组件热替换

## 关键点

- Vite 默认开启 HMR，CSS / JSON 自动支持
- JS 模块默认不支持 HMR，需要显式声明边界：

  ```js
  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => { ... })
  }
  ```

- 如果模块未声明 HMR 边界，更新会"冒泡"到上层，最终触发整页刷新
- 框架（如 Vue、React）的官方插件会在内部帮你声明 HMR，业务代码无需手写
