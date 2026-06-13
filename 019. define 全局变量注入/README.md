# 19. define 全局变量注入

演示 Vite 配置项 `define` 的用法，相当于编译期的字符串替换。

## 启动

```bash
npm install
npm run dev
```

## 关键点

- `define` 中所有值（包括对象）都必须 `JSON.stringify` 后再写入
- 替换发生在编译期，源码中直接使用 `__APP_VERSION__` 这种全局标识符
- 与 `import.meta.env` 的区别：`define` 更通用，可以注入任意常量；`env` 只读 `.env` 文件
- 在 TS 项目中需要在 `.d.ts` 中声明这些全局变量
