# 05. 静态资源加载（img）

演示 Vite 中各种引用静态资源（特别是图片）的方式。

## 启动

```bash
npm install
npm run dev
npm run build
```

## 文件结构

```
.
├── index.html
├── main.js
├── style.css
├── public/
│   └── public-img.svg     # public 目录：原样复制到 dist 根目录
└── src/
    └── assets/
        ├── logo.svg       # 通过 import 引用，会被打包并指纹化（hash）
        └── src-img.svg
```

## 七种引用方式

| 方式          | 写法                                  | 说明                             |
| ------------- | ------------------------------------- | -------------------------------- |
| ① `import`    | `import url from './x.svg'`           | 默认行为，自动指纹化             |
| ② CSS `url()` | `background: url(./x.svg)`            | Vite 自动重写路径                |
| ③ `?url` 后缀 | `import url from './x.svg?url'`       | 显式只要 URL                     |
| ④ `?raw` 后缀 | `import str from './x.svg?raw'`       | 拿到文件原始字符串               |
| ⑤ `public/`   | `<img src="/x.svg">`                  | 不打包，原样复制                 |
| ⑥ `new URL()` | `new URL('./x.svg', import.meta.url)` | 适合动态拼路径                   |
| ⑦ HTML img    | `<img src="./x.svg">`                 | 在 index.html 中也会被 Vite 处理 |

## 重要区别：src/assets 与 public

|          | `src/assets/`         | `public/`                                         |
| -------- | --------------------- | ------------------------------------------------- |
| 是否打包 | ✅ 会被处理           | ❌ 原样复制                                       |
| 文件名   | 加 hash 指纹          | 保持原名                                          |
| 引用方式 | `import` 或 `new URL` | 直接 `/xxx` 路径                                  |
| 使用场景 | 在 JS / CSS 中引用    | 不变的文件（robots.txt、favicon、固定路径资源等） |

## 小图自动转 base64

Vite 会把 **小于 4KB**（默认）的图片转成 base64 内联，可通过 `build.assetsInlineLimit` 配置阈值。
