# 06. CSS Modules

演示 Vite 内置的 CSS Modules 支持。

## 启动

```bash
npm install
npm run dev
```

## 关键点

- **文件命名**：以 `.module.css` 结尾的文件会被作为 CSS Modules 处理
  - `xxx.module.css` ✅ CSS Modules
  - `xxx.css` ❌ 普通全局 CSS

- **使用方式**：

  ```js
  import styles from './card.module.css'

  // styles 是一个对象：{ container: '...hashed...', title: '...' }
  element.className = styles.container
  ```

- **类名转换**：默认会将 `kebab-case` 转成 `camelCase`（受 `localsConvention` 影响）

  ```css
  /* card.module.css */
  .my-class {
    color: red;
  }
  ```

  ```js
  import s from './card.module.css'
  s.myClass // ✅
  s['my-class'] // 取决于 localsConvention 配置
  ```

## 配置

[vite.config.js](vite.config.js) 中通过 `css.modules` 字段配置：

| 配置项               | 说明                                                    |
| -------------------- | ------------------------------------------------------- |
| `generateScopedName` | 生成的类名规则，如 `[name]__[local]___[hash:base64:5]`  |
| `localsConvention`   | `camelCaseOnly` / `camelCase` / `dashes` / `dashesOnly` |
| `scopeBehaviour`     | `local`(默认) / `global`                                |
| `globalModulePaths`  | 这些路径下的 `.module.css` 不做处理                     |

## 同样支持 SCSS / LESS

只需把后缀改为 `.module.scss` / `.module.less` 并安装对应预处理器即可。
