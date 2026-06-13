# Demo 11 - 单页面应用 (SPA)

## 演示要点

- 单一 `index.html` 入口，路由全部由前端 JS 控制（手写极简 history 路由）
- Vite dev server 默认对未匹配路径回退到 `index.html`，所以刷新 `/about` 也能正常显示
- 生产部署时，需要在 nginx / 静态服务器上配置 `try_files $uri $uri/ /index.html`

## 运行

```bash
npm install
npm run dev
```

## SPA vs MPA

| 维度     | SPA                | MPA        |
| -------- | ------------------ | ---------- |
| 入口     | 1 个 HTML          | 多个 HTML  |
| 切换页面 | 前端路由（无刷新） | 浏览器跳转 |
| 首屏     | 较慢（需要下 JS）  | 较快       |
| SEO      | 需要 SSR           | 友好       |
