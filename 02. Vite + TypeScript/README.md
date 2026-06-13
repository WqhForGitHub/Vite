# 02. Vite + TypeScript

Vite 原生支持 TypeScript，开发时只做转译（esbuild），不做类型检查。
类型检查放到 build 时通过 `tsc --noEmit` 完成。

## 启动

```bash
npm install
npm run dev      # 开发
npm run build    # 类型检查 + 打包
```

## 文件结构

```
.
├── index.html
├── src
│   ├── main.ts       # 入口
│   ├── counter.ts    # 模块
│   ├── types.ts      # 类型定义
│   └── style.css
├── tsconfig.json
└── package.json
```

## 关键点

- Vite 对 `.ts` 文件使用 esbuild 转译，速度极快
- 不做类型检查；要类型检查请使用 `tsc --noEmit`
- `tsconfig.json` 中 `isolatedModules: true` 是 Vite 推荐配置
- `build` 脚本：先 `tsc` 进行类型检查，再 `vite build` 打包
