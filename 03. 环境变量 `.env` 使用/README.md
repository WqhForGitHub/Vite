# 03. 环境变量 .env 使用

演示 Vite 的环境变量加载机制。

## 文件优先级

Vite 按以下优先级加载（同名变量后面覆盖前面）：

1. `.env` 所有模式都会加载
2. `.env.local` 所有模式都会加载，**会被 git 忽略**
3. `.env.[mode]` 指定模式下加载（development/production/staging…）
4. `.env.[mode].local` 指定模式 + 本地，**会被 git 忽略**

## 启动

```bash
npm install
npm run dev              # 加载 .env + .env.development
npm run dev:staging      # 加载 .env + .env.staging
npm run build            # 加载 .env + .env.production
npm run build:staging    # 加载 .env + .env.staging
```

## 关键点

- **只有以 `VITE_` 开头的变量才会暴露给客户端代码**（防止意外泄漏密钥）
- 通过 `import.meta.env.VITE_XXX` 在代码中访问
- Vite 内置变量：
  - `MODE`：当前模式（development / production / staging…）
  - `DEV`：是否开发环境（boolean）
  - `PROD`：是否生产环境（boolean）
  - `BASE_URL`：应用公共路径（base 配置）

## 自定义 mode

```bash
vite --mode staging      # 加载 .env.staging
vite build --mode staging
```
