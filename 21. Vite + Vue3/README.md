# 21. 单页面应用（SPA）—— 纯 Vite

演示用纯 Vite + Vanilla JS 实现一个 SPA（单页面应用），不引入任何框架。

## 启动

```bash
npm install
npm run dev
```

## 文件结构

```
.
├── index.html              # 唯一的 HTML 入口
├── src/
│   ├── main.js             # JS 入口，挂载根组件、初始化路由
│   ├── router.js           # 简易 hash 路由实现
│   ├── style.css
│   └── pages/
│       ├── Home.js
│       ├── About.js
│       └── Contact.js
└── vite.config.js
```

## 关键点

- SPA 的核心：只有 1 个 HTML，所有页面切换由 JS 控制 DOM
- 这里用 hashchange 实现，url 形如 `#/about`
- Vite 的默认行为就是 SPA（单入口），无需额外配置
