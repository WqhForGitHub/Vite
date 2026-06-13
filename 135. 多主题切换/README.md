# 135. 多主题切换

基于 Vite + 纯 CSS 变量的多主题切换 demo。

## 功能特性

- 5 套预置主题：浅色 / 深色 / 海洋 / 森林 / 日落
- 通过 `[data-theme]` 属性 + CSS 变量切换，性能高、无闪烁
- 主题选择持久化到 `localStorage`
- 「跟随系统」模式：自动响应 `prefers-color-scheme`
- 平滑过渡动画

## 运行

```bash
npm install
npm run dev
```

## 关键实现

1. 在 `styles/theme.css` 中为每个主题定义一组 CSS 变量
2. 全部组件均使用 `var(--c-xxx)` 引用变量
3. JS 仅负责修改 `document.documentElement.setAttribute('data-theme', x)`

## 文件结构

- `vite.config.js` Vite 配置
- `index.html` 页面结构
- `main.js` 主题切换逻辑（localStorage / matchMedia）
- `styles/theme.css` 多主题变量定义
- `styles/main.css` 业务样式
