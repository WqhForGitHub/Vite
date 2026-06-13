# 150. 微前端 + Vite（完整方案）

基于「原生 ESM + 多 dev server」的轻量级微前端方案。
没有任何额外运行时（无 qiankun / single-spa），完全依赖 Vite 的 ESM dev/build 输出。

```
.
├── host/         # 主应用 :5150
├── app1/         # 子应用 1 :5151
├── app2/         # 子应用 2 :5152
└── scripts/dev-all.js  # 一键启动 3 个 dev server
```

## 运行

```bash
pnpm i
pnpm dev          # 一键启动 host + app1 + app2
# 或分别启动
pnpm dev:host
pnpm dev:app1
pnpm dev:app2
```

打开 http://localhost:5150 ，点击按钮即可看到子应用动态加载 / 卸载。

## 关键设计

1. **协议**：每个子应用在 `src/bootstrap.js` 导出 `mount(container, props)` / `unmount()`
2. **加载**：host 用原生 `import(remoteUrl)` 加载子应用入口，浏览器自动处理依赖图
3. **CORS**：子应用必须 `server.cors: true` + `server.origin`，否则跨端口加载会被拦截
4. **HMR**：每个子应用独立的 `hmr.port`，避免端口冲突；HMR 在子应用独立调试时仍可用
5. **构建**：子应用用 `rollupOptions.input` 把 `bootstrap.js` 作为入口产出 ESM，部署到独立 CDN/域名
6. **隔离**：DOM 通过容器隔离；如需 JS / CSS 沙箱，可叠加 Web Components / Shadow DOM
7. **通信**：示例中通过 `window.dispatchEvent(new CustomEvent(...))` 简单广播；生产可使用全局 EventBus

## 生产部署

```bash
pnpm build:host && pnpm build:app1 && pnpm build:app2
```

将 `dist/host/` 部署到主域名，`dist/app1/`、`dist/app2/` 各自部署到独立子域名/CDN，
然后在 host 的 registry 中替换为生产 URL 即可。
