# Demo 12 - publicDir 使用

## 演示要点

- `public/` 目录里的文件**不会被 Vite 处理**：不会被 import、不会带 hash、不会做转换
- 引用方式：直接以根路径 `/` 开头（如 `/logo.svg`），与 `base` 配置自动结合
- 适合放：
  - `favicon.ico`、`robots.txt`、`sitemap.xml`
  - 第三方需要用绝对 URL 引入的库
  - 不希望参与构建的固定文件

## public 资源 vs import 资源

| 维度         | `public/xxx`       | `src/xxx`（import）                |
| ------------ | ------------------ | ---------------------------------- |
| URL          | `/xxx`（固定）     | 带 hash 的 `/assets/xxx-xxxxx.ext` |
| 是否进入构建 | 否（直接复制）     | 是                                 |
| 缓存         | 文件不变就一直命中 | 内容变 hash 变                     |

## 运行

```bash
npm install
npm run dev
# 看 /logo.svg 直接命中 public 文件
# 看页面中第二张图（import）有 hash 化 URL
```
