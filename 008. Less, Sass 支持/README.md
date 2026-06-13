# Demo 08 - Less, Sass 支持

## 演示要点

- Vite 原生支持 `.less` / `.scss` / `.sass`，只需安装对应预处理器即可
- 通过 `css.preprocessorOptions` 给 Less / Sass 注入全局变量
- 直接 `import './style.less'` / `import './style.scss'`

## 运行

```bash
npm install
npm run dev
```

## 关键配置（vite.config.js）

```js
css: {
  preprocessorOptions: {
    less: { javascriptEnabled: true, additionalData: `@global-color: #1677ff;` },
    scss: { additionalData: `$global-color: #ff4d4f;` },
  },
}
```
