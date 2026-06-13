# 20. mode（dev, prod）切换

演示 Vite 的 `--mode` 参数与对应 `.env.[mode]` 文件加载。

## 启动

```bash
npm install
npm run dev           # mode = development
npm run dev:staging   # mode = staging
npm run build         # mode = production，输出到 dist-production
npm run build:staging # mode = staging，输出到 dist-staging
```

## 关键点

- `vite` 默认 `mode = development`，`vite build` 默认 `mode = production`
- 用 `--mode xxx` 指定后会加载 `.env.xxx` 文件
- 配置文件中通过 `defineConfig(({ command, mode }) => {})` 拿到当前模式
- `loadEnv(mode, cwd)` 用于在配置阶段读取 `.env` 内容
- `import.meta.env.MODE / DEV / PROD` 在客户端代码可用
