# 23. assetsDir 区别

演示 `build.assetsDir` 与 `publicDir` 的区别。

## 启动

```bash
npm install
npm run dev
npm run build   # 构建后查看 dist/ 目录结构
```

## 关键点

- `build.assetsDir`：从 **src** 中 `import` 的静态资源被打包后存放的子目录（默认 `assets`）
- `publicDir`：原样拷贝到 `outDir` 根部的目录（默认 `public`）
- 本 demo 把 `assetsDir` 改成了 `static/files`，构建后 `src` 中的图片会进 `dist/static/files/`
- `assetsInlineLimit`：小于此值（默认 4096 byte）的文件会被内联为 base64
