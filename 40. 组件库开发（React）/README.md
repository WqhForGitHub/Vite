# 组件库开发（React）

使用 Vite Library Mode 构建可发布的 React 18 组件库。

```bash
pnpm install
pnpm dev      # 在 playground 中开发调试
pnpm build    # 输出到 dist/  (esm + umd)
```

要点：

- `build.lib.entry` 指定入口
- `rollupOptions.external` 排除 `react / react-dom / react/jsx-runtime`
- `peerDependencies` 声明 react 由用户提供
- 组件 CSS 通过 import 注入，构建时会自动打包成单独 css 文件
