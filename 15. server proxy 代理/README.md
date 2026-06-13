# Demo 15 - server proxy 代理

## 演示要点

- `server.proxy` 用于**开发阶段**解决跨域问题：浏览器请求同源 dev server，由 dev server 代为转发
- 关键字段：
  - `target`：目标服务器
  - `changeOrigin: true`：把请求头中的 host 改成 target 的 host（大多数线上 API 必须开启）
  - `rewrite`：路径改写函数，常用于去掉 `/api` 前缀
  - `ws: true`：开启 WebSocket 代理
- **注意**：proxy 只在 dev / preview 时生效，生产环境需要由 nginx / 网关处理

## 运行

```bash
npm install
npm run dev
# 点击按钮看 /api/todos/1 的请求结果
# 看到图片成功加载即说明 /img 代理生效
```

## 常见匹配

| 写法                                        | 含义                        |
| ------------------------------------------- | --------------------------- |
| `'/api': 'http://localhost:3000'`           | 字符串简写                  |
| `'/api': { target, changeOrigin, rewrite }` | 对象写法                    |
| `'^/img/.*': { ... }`                       | 正则匹配（key 以 `^` 开头） |
