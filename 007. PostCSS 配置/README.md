# 07. PostCSS 配置

演示 Vite 中如何配置 PostCSS。
**Vite 内置 PostCSS 支持**——只要项目根目录下有 `postcss.config.js`（或 `.postcssrc.*`），Vite 会自动加载，无需在 `vite.config.js` 中额外配置。

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
├── postcss.config.js     # PostCSS 插件配置（Vite 自动识别）
├── .browserslistrc       # 目标浏览器（autoprefixer 依赖它）
└── package.json
```

## 用到的插件

| 插件                   | 作用                                                           |
| ---------------------- | -------------------------------------------------------------- |
| **autoprefixer**       | 根据 browserslist 自动加浏览器前缀，例如 `-webkit-user-select` |
| **postcss-nested**     | 支持 SCSS 风格的嵌套语法 `& > .child {}`                       |
| **postcss-preset-env** | 让你写"未来 CSS"，自动按 stage 降级                            |

## 两种配置方式

### 方式 1：独立 `postcss.config.js`（推荐）

```js
// postcss.config.js
import autoprefixer from 'autoprefixer'
export default {
  plugins: [autoprefixer()],
}
```

### 方式 2：写在 `vite.config.js` 里

```js
// vite.config.js
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
})
```

> ⚠ 如果同时配置了 `vite.config.js` 中的 `css.postcss`，**会覆盖**根目录下的 `postcss.config.js`。

## 浏览器目标（browserslist）

[autoprefixer] 和 [postcss-preset-env] 都基于 [browserslist](https://github.com/browserslist/browserslist) 的目标列表来决定该加哪些前缀、该降级哪些特性。

可以写在：

- `.browserslistrc`（本 demo 用法）
- `package.json` 的 `"browserslist"` 字段

## 验证效果

启动后，在 DevTools - Elements 中查看 `.btn` / `.grid` 等的实际生效 CSS：

- `user-select: none;` 会自动补 `-webkit-user-select`、`-ms-user-select`
- 嵌套语法被展开成扁平选择器
- 新特性根据 `stage` 被降级
