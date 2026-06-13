# 136. Vite HMR 原理实现

通过实际可观察的例子，理解 Vite 的 HMR (Hot Module Replacement) 工作机制。

## HMR 工作流程

```
┌──────────┐    ws (vite-hmr)    ┌──────────────┐
│ Browser  │  ◄───────────────►  │ Vite Server  │
│  client  │                     │  + chokidar  │
└────┬─────┘                     └──────┬───────┘
     │                                  │
     │  1. /@vite/client 建立 WS         │
     │                                  │ 2. 监听文件变化
     │                                  │ 3. 计算 ModuleGraph 上的 HMR 边界
     │  4. 收到 update 事件 ◄──────────  │
     │  5. 动态 import?t=时间戳           │
     │  6. 执行 accept 回调               │
```

## 演示要点

| 模块      | 文件               | HMR 行为                                   |
| --------- | ------------------ | ------------------------------------------ |
| 计数器    | `src/counter.js`   | 调用 `import.meta.hot.accept()` → 就地替换 |
| 数据      | `src/data.js`      | 父级 `accept('./data.js')` → 父级触发回调  |
| 样式      | `src/widget.css`   | Vite 默认对 CSS 做 HMR → 不刷新            |
| 无 accept | `src/no-accept.js` | 一直冒泡到入口 → full-reload 整页刷新      |

## 关键 API

```js
if (import.meta.hot) {
  // 1. 接受自身更新
  import.meta.hot.accept((newModule) => {})

  // 2. 接受依赖更新
  import.meta.hot.accept('./dep.js', (newDep) => {})

  // 3. 模块替换前清理副作用（定时器、监听器）
  import.meta.hot.dispose(() => {})

  // 4. 主动放弃 HMR，让其冒泡
  import.meta.hot.invalidate()

  // 5. 监听 HMR 事件
  import.meta.hot.on('vite:beforeUpdate', (payload) => {})
  import.meta.hot.on('custom-event', (data) => {}) // 自定义事件
}
```

## 自定义插件演示

`vite.config.js` 中包含一个 `hmr-event-broadcaster` 插件：

- 每 5 秒通过 `server.ws.send` 广播 `server:tick` 自定义事件
- `handleHotUpdate` 钩子：拦截热更，附加 `hmr:file-changed` 自定义事件

打开右侧「事件日志」面板可以实时观察这些事件。

## 运行

```bash
npm install
npm run dev
```

启动后：

1. 打开浏览器开发者工具 → Network → WS，可以看到 `vite-hmr` 长连接
2. 修改不同的源文件，对比是「整页刷新」还是「局部更新」
3. 右侧日志面板会打印所有 HMR 事件（vite:beforeUpdate / afterUpdate / fullReload / 自定义事件）

## 文件结构

```
136. Vite HMR 原理实现/
├── vite.config.js       # Vite 配置 + 自定义 HMR 插件
├── package.json
├── index.html
├── main.js              # 入口：accept 依赖 + 监听全部 HMR 事件
├── style.css
└── src/
    ├── counter.js       # 自更新（self-accept）
    ├── data.js          # 数据模块
    ├── no-accept.js     # 无 accept → 整页刷新
    └── widget.css       # 样式 HMR
```
