# 145. Vite SSR 原理

演示 Vite 是如何在「开发态」用中间件模式 + `ssrLoadModule` 提供 SSR 能力的。

## 运行

```bash
pnpm i  # 或 npm i
pnpm dev
# 访问 http://localhost:5145
```

## 关键点

- `vite.config.js` 设置 `appType: 'custom'` + `server.middlewareMode: true`，让 Vite 不监听端口，仅作为中间件提供模块转换 / HMR。
- `server.js` 用 Express 接管路由，每次请求执行：
  1. `vite.transformIndexHtml(url, template)` ：注入 HMR 客户端、处理 `<script type="module">`
  2. `vite.ssrLoadModule('/src/entry-server.js')`：在 Node 中以 ESM 形式加载服务端入口，自动完成 import 重写、TS/JSX 转译
  3. 调用 `render()` 拿到字符串，塞回 `<!--ssr-outlet-->`
- 客户端 `entry-client.js` 在浏览器中执行 `hydrate`，完成事件绑定。

## 生产构建

```bash
pnpm build           # 同时产出 dist/client 与 dist/server
```

`vite build --ssr` 会跳过 HTML 处理，直接产出 Node 可执行的 ESM bundle。
