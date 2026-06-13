# 25. server proxy 代理

演示 Vite 开发服务器的 `server.proxy` 配置，用于解决前端开发期跨域问题。

## 启动

```bash
npm install
npm run dev
```

打开页面后点击按钮，观察网络请求：

| 浏览器请求                  | 实际转发到                                     |
| --------------------------- | ---------------------------------------------- |
| `/api/posts/1`              | `https://jsonplaceholder.typicode.com/posts/1` |
| `/api/users`                | `https://jsonplaceholder.typicode.com/users`   |
| `/github/repos/vitejs/vite` | `https://api.github.com/repos/vitejs/vite`     |

## 关键点

- `target`：转发的目标地址
- `changeOrigin: true`：修改请求头中的 Host 字段以匹配 target，避免被服务端拒绝
- `rewrite`：重写路径，常用于去掉前缀
- `ws: true`：启用 websocket 代理
- `configure`：拿到底层 http-proxy 实例，可监听事件、改请求头
- 仅在开发服务器有效，生产环境需要由 nginx / 后端做反向代理
