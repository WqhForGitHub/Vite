# Demo 09 - alias 路径别名

## 演示要点

- 在 `vite.config.js` 中通过 `resolve.alias` 配置 `@` 指向 `./src`
- 业务代码中使用 `import x from '@/utils/xxx'` 替代 `../../../utils/xxx`
- 别名同样可以用于 CSS 中的 `@import`

## 关键配置

```js
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
  },
}
```

> 提示：如果使用 VS Code，建议再加一个 `jsconfig.json`/`tsconfig.json` 的 `paths` 让编辑器也能识别。

## 运行

```bash
npm install
npm run dev
```
