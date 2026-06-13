# 04. import.meta.env Demo

专门演示 Vite 在客户端代码中注入的 **`import.meta.env`** 对象，以及与 `define` 全局常量注入的区别。

## 启动

```bash
npm install
npm run dev               # MODE = development
npm run dev:staging       # MODE = staging
npm run build             # MODE = production
npm run build:staging     # MODE = staging（构建）
```

## `import.meta.env` 包含什么？

### ① Vite 内置变量（始终存在）

| Key        | 说明                                                                |
| ---------- | ------------------------------------------------------------------- |
| `MODE`     | 当前模式：`development` / `production` / 自定义模式（如 `staging`） |
| `DEV`      | 是否是开发模式（boolean）                                           |
| `PROD`     | 是否是生产模式（boolean）                                           |
| `SSR`      | 是否是 SSR 构建（boolean）                                          |
| `BASE_URL` | 部署的公共基础路径（对应 `vite.config.js` 中的 `base` 字段）        |

### ② 用户自定义变量

来自 `.env`、`.env.[mode]` 等文件，**只有以 `VITE_` 开头的变量才会被暴露**到客户端：

```env
VITE_API_BASE=http://localhost:3000   # ✅ 暴露
SECRET=xxx                             # ❌ 不暴露
```

> 前缀可以通过 `vite.config.js` 中的 `envPrefix` 改成其他的（如 `APP_`）。

## 编译时注入 vs 运行时读取

`import.meta.env.XXX` 在 **构建时** 会被 Vite **静态替换**为字面量：

```js
// 源码
if (import.meta.env.DEV) {
  console.log('only dev')
}

// 生产构建后（DEV=false）
if (false) {
  console.log('only dev')
}
// 然后被压缩工具直接 tree-shake 掉
```

这意味着：

- ✅ 你可以放心写 `if (import.meta.env.DEV)`，dev-only 的代码不会进生产包
- ❌ 不能动态拼接：`import.meta.env['VITE_' + name]` 是拿不到值的（因为不是静态分析）

## `import.meta.env` vs `define`

|      | `import.meta.env.VITE_XXX`         | `define: { __FOO__: ... }`                 |
| ---- | ---------------------------------- | ------------------------------------------ |
| 来源 | `.env` 文件                        | `vite.config.js` 的 `define` 字段          |
| 限制 | 必须 `VITE_` 前缀                  | 任意名字（建议全大写双下划线如 `__APP__`） |
| 类型 | 字符串（env 文件本身只能写字符串） | 任意 JSON 序列化值                         |
| 用法 | `import.meta.env.VITE_API`         | 直接 `__FOO__`（裸标识符）                 |

本 demo 在 `vite.config.js` 中通过 `define` 注入了 `__APP_NAME__` 和 `__APP_BUILD_TIME__`，可以在页面上看到效果。

## TypeScript 类型提示

如果是 TS 项目，可以在 `src/vite-env.d.ts` 里加自定义变量的类型：

```ts
interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  readonly VITE_APP_TITLE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 文件结构

```
.
├── index.html
├── main.js                # 演示如何读取 / 使用 import.meta.env
├── style.css
├── vite.config.js         # 配置 envPrefix / define
├── .env                   # 公共变量
├── .env.development
├── .env.production
├── .env.staging
└── package.json
```
