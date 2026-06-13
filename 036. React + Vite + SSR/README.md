# React + Vite + SSR

```bash
pnpm install
pnpm dev
```

关键点：

- `renderToString` 服务端渲染 React 元素
- `hydrateRoot` 客户端注水
- `vite.ssrLoadModule` 加载服务端模块（支持 ESM + HMR）
