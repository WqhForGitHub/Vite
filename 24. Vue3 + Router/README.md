# 24. base 配置部署路径

演示 Vite 的 `base` 选项，用于把项目部署到子路径（如 `https://x.com/my-app/`）。

## 启动

```bash
npm install
npm run dev                # 默认 base = '/'
npm run build              # 默认 base = '/'
npm run build:subpath      # base = '/my-app/'
npm run preview:subpath
```

## 关键点

- `base` 影响所有 import 的资源 URL 前缀（包括 `<script>`、CSS、图片等）
- 代码中应使用 `import.meta.env.BASE_URL` 而不是硬编码 `/`
- `public/` 中文件的运行时路径也会自动带上 base
- 也可以通过 CLI `--base=/foo/` 覆盖配置
- 必须以 `/` 开头和结尾（除非使用相对路径 `./`）
