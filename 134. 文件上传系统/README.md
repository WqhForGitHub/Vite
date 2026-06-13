# 134. 文件上传系统

基于 Vite 的纯原生 JS 文件上传系统 demo。

## 功能特性

- 拖拽上传 / 点击选择
- 多文件队列管理
- 实时进度条
- **分片上传**（默认 2MB / 片）
- **秒传校验**（基于文件 hash）
- **暂停 / 恢复 / 移除**
- Mock 后端接口（通过 Vite 中间件）

## 运行

```bash
npm install
npm run dev
```

## 文件说明

- `vite.config.js`：Vite 配置 + mock 上传接口插件（/api/check、/api/upload、/api/merge）
- `main.js`：上传核心逻辑（hash、分片、AbortController 暂停）
- `index.html`：UI 结构
- `style.css`：样式
