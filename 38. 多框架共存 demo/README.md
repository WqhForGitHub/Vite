# 多框架共存

一个 Vite 应用同时运行 Vue 和 React。

```bash
pnpm install
pnpm dev
```

要点：通过 `@vitejs/plugin-react({ include: /\.(jsx|tsx)$/ })` 限定 React 插件作用范围，避免吃掉 `.vue` 文件的处理。
