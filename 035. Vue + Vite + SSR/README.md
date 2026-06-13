# Vue + Vite + SSR

最小化的 Vue 3 + Vite SSR 示例。

```bash
pnpm install
pnpm dev
# 浏览器查看页面源码可见服务端渲染输出
```

关键 API：

- `createServer({ middlewareMode: true })`
- `vite.ssrLoadModule(path)` 加载服务端模块
- `vue/server-renderer` 的 `renderToString`
