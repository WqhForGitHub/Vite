# Demo 13 - assetsDir 区别

## 演示要点

- `build.assetsDir`：构建产物中静态资源相对 `outDir` 的存放目录，默认 `assets`
  - 这里改成了 `static`，构建后产物为 `dist/static/xxx-hash.svg`
- `publicDir`：源码中“原样输出”的目录（不进入构建管线）
  - `public/raw.svg` 会被复制成 `dist/raw.svg`，路径不变
- `build.assetsInlineLimit`：小于这个字节数的资源会被内联为 base64
  - 本 demo 中 `big.svg` 用注释把体积撑过 4KB，确保会出现在 `assetsDir`

## 三者对比

| 配置                | 作用                     | 是否经过构建  | 路径位置                        |
| ------------------- | ------------------------ | ------------- | ------------------------------- |
| `publicDir`         | 原样复制                 | 否            | `dist/<原路径>`                 |
| `assetsDir`         | 构建产物的静态资源子目录 | 是            | `dist/<assetsDir>/...-hash.ext` |
| `assetsInlineLimit` | 阈值，小于则内联 base64  | 内联进 JS/CSS | 无单独文件                      |

## 运行

```bash
npm install
npm run build
# 查看 dist/ 目录结构：
# dist/
#   ├── index.html
#   ├── raw.svg            <- 来自 public/，不带 hash
#   └── static/            <- assetsDir，包含带 hash 的产物
#       ├── big-xxxx.svg
#       └── index-xxxx.js
```
