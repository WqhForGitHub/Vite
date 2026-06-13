# 149. monorepo + Vite（pnpm workspace）

```
.
├── pnpm-workspace.yaml
├── vite.config.js          # 根级配置（也可在根目录直接启动 web 包）
└── packages/
    ├── shared/             # 共享 lib 包，使用 vite lib 模式构建
    └── web/                # 应用包，通过 workspace:* 引用 shared
```

## 安装 & 运行

```bash
pnpm i
pnpm dev          # 启动 web 包，默认 5149 端口
pnpm build        # 先构建 shared，再构建 web
```

## 关键点

- `pnpm-workspace.yaml` 声明 `packages/*` 为工作区
- `@demo/web` 用 `workspace:*` 协议依赖 `@demo/shared`
- `web/vite.config.js` 中 `optimizeDeps.exclude: ['@demo/shared']`，避免预构建 workspace 内部包，保留源码级 HMR
- `server.fs.allow` 必须允许 workspace 根，否则 pnpm 软链文件读取会被拦截
