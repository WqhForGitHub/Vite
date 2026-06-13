# 组件库开发（Vue）

使用 Vite Library Mode 构建可发布的 Vue 3 组件库。

```bash
pnpm install
pnpm dev      # 在 playground 中开发调试
pnpm build    # 输出到 dist/  (esm + umd)
```

要点：

- `build.lib.entry` 指定入口
- `rollupOptions.external` 把 `vue` 排除，不打进库
- `package.json` 的 `exports`/`main`/`module` 指向产物
- `peerDependencies` 声明 vue 由用户提供
