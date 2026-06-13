# Demo 17 - HMR 边界测试

## 关键概念

> **HMR 边界**：当一个模块发生变更时，Vite 会沿着 import 链向上找最近一个调用了 `import.meta.hot.accept(...)` 的祖先模块，把更新“在这里停下”并执行回调。
>
> - 找到边界 → 仅热替换该子树，**页面不刷新、状态保留**
> - 一路冒泡到入口仍找不到边界 → **触发整页刷新**

## 4 种典型场景

| 文件                                | 行为                         | 修改后预期              |
| ----------------------------------- | ---------------------------- | ----------------------- |
| `self.js`                           | 自己 `accept()`              | self 框热更，计数保留   |
| `child.js`（被 `parent.js` accept） | 冒泡 1 层后被接受            | parent 框热更，计数保留 |
| `bubble.js`                         | 没有任何祖先 accept          | **整页刷新**，计数清零  |
| `invalidate.js`                     | accept 后调用 `invalidate()` | 主动回退到**整页刷新**  |

## 操作步骤

```bash
npm install
npm run dev
```

1. 点几次 +1 把计数变成 5
2. 依次修改上面 4 个文件中的字符串
3. 观察“计数”是否保留 + 控制台 `[hmr]` 日志

## 何时主动 invalidate？

- 模块持有难以恢复的运行时状态（websocket 连接、复杂副作用）
- 热替换后 UI 与状态不一致
- 调试时想强制 reload

## 参考

- Vite HMR API: https://vitejs.dev/guide/api-hmr.html
