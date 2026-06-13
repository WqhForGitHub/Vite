# 22. publicDir 使用

演示 Vite 的 `publicDir` 与 `src/` 资源处理的差异。

## 启动

```bash
npm install
npm run dev
npm run build  # 构建后查看 dist/ 中各资源的命名差异
```

## 关键点

| 来源      | 引用方式                        | 是否被 Vite 处理 | 输出文件名        |
| --------- | ------------------------------- | ---------------- | ----------------- |
| `public/` | `/logo-public.svg`              | 否，原样拷贝     | `logo-public.svg` |
| `src/`    | `import logo from './logo.svg'` | 是               | `logo-[hash].svg` |

## 何时使用 publicDir

- favicon、robots.txt、sitemap.xml、`.well-known/*`
- 完全不希望被 Vite 改名的资源（如 SDK 提供的固定路径文件）
- 永远不会被 import 的大文件（如视频、PDF）

## 注意

- 不要在 JS 中 `import` public 下的文件
- public 路径不会带 base，即 `base: '/foo/'` 时 public 资源在生产环境实际路径为 `/foo/xxx`，但代码中写 `/xxx`（Vite 会自动处理）
