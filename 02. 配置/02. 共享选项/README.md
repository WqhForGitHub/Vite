# 共享选项

除非另有说明，本节中的选项适用于所有开发、构建和预览。

## Demo 列表

```
02. 共享选项/
├── 01-root与base路径/
│   ├── package.json
│   └── vite.config.ts              # root（项目根目录）与 base（公共基础路径）
├── 02-mode与环境变量/
│   ├── package.json
│   ├── vite.config.ts              # mode、envDir、envPrefix 环境变量配置
│   ├── .env                        # 共享变量
│   ├── .env.development            # 开发环境变量
│   ├── .env.production             # 生产环境变量
│   └── .env.staging                # staging 环境变量
├── 03-define全局常量/
│   ├── package.json
│   ├── vite.config.ts              # define 全局常量替换
│   └── vite-env.d.ts               # TypeScript 类型声明示例
├── 04-resolve别名配置/
│   ├── package.json
│   └── vite.config.ts              # resolve.alias 对象格式/数组格式/正则匹配
├── 05-resolve解析配置/
│   ├── package.json
│   ├── vite.config.ts              # resolve.tsconfigPaths/extensions/conditions/mainFields/dedupe/preserveSymlinks
│   └── tsconfig.example.json       # tsconfig paths 示例配置
├── 06-公共资源与缓存/
│   ├── package.json
│   └── vite.config.ts              # publicDir、cacheDir、assetsInclude
├── 07-CSS模块配置/
│   ├── package.json
│   ├── vite.config.ts              # css.modules、preprocessorOptions、postcss、devSourcemap
│   └── postcss.config.js           # PostCSS 配置文件示例
├── 08-JSON与Oxc配置/
│   ├── package.json
│   └── vite.config.ts              # json.namedExports、json.stringify、oxc 转换选项
└── 09-应用类型与日志/
    ├── package.json
    ├── vite.config.ts              # appType、html.cspNonce、logLevel、customLogger、clearScreen、plugins、devtools、future
    └── index.mpa.html              # MPA 多页应用示例页面
```

| Demo               | 知识点                                     | 说明                                                                        |
| ------------------ | ------------------------------------------ | --------------------------------------------------------------------------- |
| 01-root与base路径  | `root` + `base`                            | 项目根目录指定，公共基础路径配置（子路径部署、相对路径等）                  |
| 02-mode与环境变量  | `mode` + `envDir` + `envPrefix`            | 环境模式覆盖，.env 文件加载目录，暴露到客户端的变量前缀                     |
| 03-define全局常量  | `define`                                   | 全局常量替换，JSON.stringify 用法，TypeScript 类型声明                      |
| 04-resolve别名配置 | `resolve.alias`                            | 对象格式/数组格式/正则匹配三种别名配置方式                                  |
| 05-resolve解析配置 | `resolve.*`                                | tsconfigPaths、extensions、conditions、mainFields、dedupe、preserveSymlinks |
| 06-公共资源与缓存  | `publicDir` + `cacheDir` + `assetsInclude` | 静态资源目录、缓存目录、额外静态资源类型                                    |
| 07-CSS模块配置     | `css.*`                                    | CSS Modules、预处理器选项、PostCSS、开发 sourcemap                          |
| 08-JSON与Oxc配置   | `json.*` + `oxc`                           | JSON 按名导入/字符串化，Oxc JSX 转换配置                                    |
| 09-应用类型与日志  | `appType` + 日志 + 其他                    | SPA/MPA/custom 类型，CSP nonce，日志级别，自定义 logger                     |

每个 demo 都包含 `package.json`，进入对应目录执行 `npm install && npm run dev` 即可运行。

---

## root

- **类型**：`string`
- **默认**：`process.cwd()`

项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。

## base

- **类型**：`string`
- **默认**：`/`

开发或生产环境服务的公共基础路径。合法的值包括：

- 绝对 URL 路径名，例如 `/foo/`
- 完整的 URL，例如 `https://bar.com/foo/`（域名部分在开发环境中不会被使用）
- 空字符串 `""` 或 `./`（用于嵌入形式的开发）

## mode

- **类型**：`string`
- **默认**：`'development'` 用于开发，`'production'` 用于构建

在配置中指明将会把 serve 和 build 时的模式都覆盖掉。也可以通过命令行 `--mode` 选项来重写。

## define

- **类型**：`Record<string, any>`

定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。值的表达式必须是一个包含 JSON 可序列化值或单一标识符的字符串。对于非字符串值，Vite 将自动使用 `JSON.stringify` 将其转换为字符串。

> 对于使用 TypeScript 的开发者来说，请确保在 `vite-env.d.ts` 文件中添加类型声明。

## plugins

- **类型**：`(Plugin | Plugin[] | Promise<Plugin | Plugin[]>)[]`

需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化。

## publicDir

- **类型**：`string | false`
- **默认**：`"public"`

作为静态资源服务的文件夹。该目录中的文件在开发期间在 `/` 处提供，并在构建期间复制到 `outDir` 的根目录。设为 `false` 关闭此功能。

## cacheDir

- **类型**：`string`
- **默认**：`"node_modules/.vite"`

存储缓存文件的目录。使用缓存可以提高性能。可使用 `--force` 重新生成缓存。

## resolve.alias

- **类型**：`Record<string, string> | Array<{ find: string | RegExp, replacement: string }>`

定义用于替换 import 或 require 语句中值的别名。条目的顺序很重要，最先定义的规则首先应用。使用文件系统路径时请始终使用绝对路径。

## resolve.dedupe

- **类型**：`string[]`

如果你在你的应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本。

## resolve.conditions

- **类型**：`string[]`
- **默认**：`['module', 'browser', 'development|production']`

在解析 npm 包的条件导出时，可以指定额外允许的条件。`development|production` 是特殊值，根据 `process.env.NODE_ENV` 替换。

## resolve.mainFields

- **类型**：`string[]`
- **默认**：`['browser', 'module', 'jsnext:main', 'jsnext']`

package.json 中，在解析包的入口点时尝试的字段列表。比从 exports 字段解析的条件导出优先级低。

## resolve.extensions

- **类型**：`string[]`
- **默认**：`['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`

导入时想要省略的扩展名列表。不建议忽略自定义导入类型的扩展名（如 `.vue`）。

## resolve.preserveSymlinks

- **类型**：`boolean`
- **默认**：`false`

启用此选项会使 Vite 通过原始文件路径（不跟随符号链接）确定文件身份。

## resolve.tsconfigPaths

- **类型**：`boolean`
- **默认**：`false`

启用 tsconfig 路径解析功能。tsconfig.json 中的 paths 选项将用于解析导入。

## html.cspNonce

- **类型**：`string`

一个在生成脚本或样式标签时会用到的 nonce 值占位符。设置此值还会生成一个带有 nonce 值的 meta 标签。

## css.modules

配置 CSS Modules 的行为。选项将被传递给 postcss-modules。当使用 Lightning CSS 时，应使用 `css.lightningcss.cssModules` 替代。

## css.postcss

- **类型**：`string | (postcss.ProcessOptions & { plugins?: postcss.AcceptedPlugin[] })`

内联的 PostCSS 配置，或者一个自定义的 PostCSS 配置路径。如果提供了内联配置，Vite 将不会搜索其他 PostCSS 配置源。

## css.preprocessorOptions

- **类型**：`Record<string, object>`

指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键。

## css.preprocessorOptions[extension].additionalData

- **类型**：`string | ((source: string, filename: string) => string | { content: string; map?: SourceMap })`

为每一段样式内容添加额外的代码。注意：如果添加的是实际样式而不仅仅是变量，那这些样式在最终产物中会重复。

## css.preprocessorMaxWorkers

- **类型**：`number | true`
- **默认**：`true`

指定 CSS 预处理器可以使用的最大线程数。`true` 表示最多为 CPU 数量减 1。

## css.devSourcemap

- **类型**：`boolean`
- **默认**：`false`

在开发过程中是否启用 sourcemap。

## css.transformer

- **类型**：`'postcss' | 'lightningcss'`
- **默认**：`'postcss'`

选择用于 CSS 处理的引擎。

## json.namedExports

- **类型**：`boolean`
- **默认**：`true`

是否支持从 .json 文件中进行按名导入。

## json.stringify

- **类型**：`boolean | 'auto'`
- **默认**：`'auto'`

若设置为 `true`，导入的 JSON 会被转换为 `export default JSON.parse("...")`，性能更好。`'auto'` 时只有数据大于 10kB 才字符串化。

## oxc

- **类型**：`OxcOptions | false`

Oxc 转换选项。最常见的用例是自定义 JSX。设置为 `false` 禁用 Oxc 转换。

## assetsInclude

- **类型**：`string | RegExp | (string | RegExp)[]`

指定额外的 picomatch 模式作为静态资源处理。

## logLevel

- **类型**：`'info' | 'warn' | 'error' | 'silent'`
- **默认**：`'info'`

调整控制台输出的级别。

## customLogger

使用自定义 logger 记录消息。可以使用 Vite 的 `createLogger` API 获取默认的 logger 并对其进行自定义。

## clearScreen

- **类型**：`boolean`
- **默认**：`true`

设为 `false` 可以避免 Vite 清屏而错过在终端中打印某些关键信息。

## envDir

- **类型**：`string | false`
- **默认**：`root`

用于加载 .env 文件的目录。设为 `false` 禁用 .env 文件的加载。

## envPrefix

- **类型**：`string | string[]`
- **默认**：`VITE_`

以 `envPrefix` 开头的环境变量会通过 `import.meta.env` 暴露在你的客户端源码中。不应设置为空字符串 `''`，否则会暴露所有环境变量。

## appType

- **类型**：`'spa' | 'mpa' | 'custom'`
- **默认**：`'spa'`

- `'spa'`：包含 HTML 中间件以及使用 SPA 回退
- `'mpa'`：包含 HTML 中间件
- `'custom'`：不包含 HTML 中间件

## devtools

- **类型**：`boolean | DevToolsConfig`
- **默认**：`false`

实验性：启用 devtools 集成，用于可视化内部状态和构建分析。

## future

- **类型**：`Record<string, 'warn' | undefined>`

启用未来的重大变更，为顺利迁移到 Vite 的下一个主要版本做好准备。
