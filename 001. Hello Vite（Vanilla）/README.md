# 01. Hello Vite (Vanilla)

最简单的 Vite Demo，无任何框架（纯原生 JS）。

## 启动

```bash
npm install
npm run dev
```

打开 http://localhost:5173 即可看到效果。

## 文件结构

```
.
├── index.html      # 入口 HTML（Vite 直接以 index.html 作为入口）
├── main.js         # JS 入口模块
├── style.css       # 样式文件
└── package.json
```

## 关键点

- `index.html` 中通过 `<script type="module" src="/main.js">` 加载入口
- `main.js` 中可以直接 `import './style.css'`，由 Vite 处理
- `npm run dev` 即可启动开发服务器，支持热更新（HMR）
