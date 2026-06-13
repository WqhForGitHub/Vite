# 18. HTML 模板变量注入

演示 Vite 在 `index.html` 中注入变量的两种方式：

1. **`.env` 内置语法**：`%VITE_XXX%` 会自动被替换为 `.env` 中的同名变量
2. **自定义插件**：通过 `transformIndexHtml` 钩子，用任意分隔符（如 `<%= XXX %>`）注入变量

## 启动

```bash
npm install
npm run dev
```

## 关键点

- 只有以 `VITE_` 开头的环境变量才能在 HTML 中通过 `%VITE_XXX%` 使用
- `transformIndexHtml` 是 Vite 插件 API，可在 HTML 输出前修改字符串
