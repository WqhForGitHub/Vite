# 微前端（Module Federation 模拟）

通过纯 Vite 能力模拟 Module Federation：

- **remote** 应用：把组件以 ESM 形式提供给外部
- **host** 应用：在运行时通过 `import('http://remote/...')` 动态加载远程模块

## 顶层 vite.config.js

仅作为说明文件存在。真正运行的 Vite 配置位于 `host/` 与 `remote/` 子目录中。

## 启动

```bash
# 终端 1：启动远程
cd remote && pnpm install && pnpm dev    # http://localhost:5174

# 终端 2：启动宿主
cd host && pnpm install && pnpm dev      # http://localhost:5173
```

## 原理

- `remote` 暴露的模块是普通 ESM
- `host` 通过浏览器原生动态 `import()` URL 实现"远程模块"加载
- `remote` 配置 CORS 允许跨域加载
- 真实生产可使用 `@originjs/vite-plugin-federation` 插件
