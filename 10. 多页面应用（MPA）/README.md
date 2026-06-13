# Demo 10 - 多页面应用 (MPA)

## 演示要点

- Vite 默认就是 MPA 友好的：每个 `.html` 都会被当成入口
- 通过 `build.rollupOptions.input` 显式声明多个入口，控制打包出的页面
- 公共依赖（`shared.js`）会被自动抽离为公共 chunk

## 目录结构

```
.
├── index.html             // 首页
├── about/index.html       // 关于页
├── contact/index.html     // 联系页
└── src/
    ├── index.js
    ├── about.js
    ├── contact.js
    └── shared.js          // 三个页面共享的模块
```

## 运行

```bash
npm install
npm run dev
# 访问 /index.html  /about/index.html  /contact/index.html
npm run build
```
