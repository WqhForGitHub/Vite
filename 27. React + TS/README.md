# 27. HMR 边界测试

深入演示 `import.meta.hot` API 的几种典型用法。

## 启动

```bash
npm install
npm run dev
```

## 测试矩阵

| 修改文件         | 现象                                 | 涉及 API                      |
| ---------------- | ------------------------------------ | ----------------------------- |
| `style.css`      | CSS 立即热替换，无刷新               | Vite 内置                     |
| `self-accept.js` | 自身热替换，状态丢失（除非自己保存） | `import.meta.hot.accept(cb)`  |
| `state.js`       | 热替换，**count 保持不变**           | `import.meta.hot.data`        |
| `timer.js`       | 热替换，旧定时器被清理，无内存泄漏   | `import.meta.hot.dispose(cb)` |
| `main.js`        | **整页刷新**（没有 accept）          | 默认行为                      |

## 关键 API

```js
import.meta.hot.accept(cb) // 接受自身更新
import.meta.hot.accept(['./a'], cb) // 接受指定依赖
import.meta.hot.dispose(cb) // 模块替换前清理
import.meta.hot.data // 跨热更新持久化数据
import.meta.hot.invalidate() // 主动放弃，触发上层或整页刷新
import.meta.hot.on('vite:beforeUpdate', cb) // 监听内置事件
```

## 经验

- 业务模块如果无副作用，可以让 HMR 冒泡到框架插件去处理
- 一旦使用了全局副作用（如挂事件、起 worker、setInterval），就必须配合 `dispose` 清理
- 用 `import.meta.hot.data` 在模块"重生"时恢复关键状态
