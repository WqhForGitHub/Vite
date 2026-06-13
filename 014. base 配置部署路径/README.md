# Demo 14 - base 配置部署路径

## 演示要点

- `base` 决定了部署后的根路径前缀，默认 `'/'`
- 部署到子路径（如 `https://example.com/my-app/`）时，需要把 `base` 设为 `'/my-app/'`
- 在代码中使用 `import.meta.env.BASE_URL` 拼接资源路径，**不要硬编码 `/`**
- 命令行 `--base=/xxx/` 可覆盖配置文件，便于一份代码部署到不同路径

## 运行

```bash
npm install

# 1) 默认 base = '/'，访问 http://localhost:4173/
npm run build && npm run preview

# 2) 部署到子路径 /my-app/，访问 http://localhost:4173/my-app/
npm run build:sub && npm run preview:sub
```

## 注意事项

- HTML 中 `<img src="/foo.png">` 这种硬编码会在子路径部署下 404，
  应改为通过 JS 用 `import.meta.env.BASE_URL` 拼接，或写成相对路径。
- `base` 必须以 `/` 开头并以 `/` 结尾。
