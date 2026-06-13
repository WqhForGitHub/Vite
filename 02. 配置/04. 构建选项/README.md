# 构建选项

除非另有说明，本节中的选项仅适用于构建。

## Demo 列表

```
04. 构建选项/
├── 01-target构建目标/          # build.target — 浏览器兼容性目标
├── 02-modulePreload模块预加载/ # build.modulePreload — 模块预加载 polyfill 与依赖解析
├── 03-outDir输出路径/          # build.outDir / assetsDir / emptyOutDir / copyPublicDir
├── 04-assetsInlineLimit资源内联/ # build.assetsInlineLimit — 资源内联阈值
├── 05-CSS构建选项/             # build.cssCodeSplit / cssTarget / cssMinify
├── 06-sourcemap源码映射/       # build.sourcemap — source map 生成配置
├── 07-rolldownOptions底层配置/ # build.rolldownOptions / dynamicImportVarsOptions
├── 08-lib库模式构建/           # build.lib — 以库的形式构建
├── 09-license许可证/           # build.license — 构建产物许可证信息
├── 10-manifest清单文件/        # build.manifest / ssrManifest — 资源映射清单
├── 11-ssr服务端渲染构建/       # build.ssr / emitAssets / ssrEmitAssets
├── 12-minify代码压缩/          # build.minify / terserOptions — 代码压缩配置
├── 13-构建输出控制/            # build.write / reportCompressedSize / chunkSizeWarningLimit
└── 14-watch监听构建/           # build.watch — 构建监听模式
```

## 知识点总览

| Demo                         | 知识点                                                           | 说明                                     |
| ---------------------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| 01-target构建目标            | `build.target`                                                   | 设置构建的浏览器兼容性目标，控制转译程度 |
| 02-modulePreload模块预加载   | `build.modulePreload`                                            | 控制模块预加载 polyfill 注入与依赖解析   |
| 03-outDir输出路径            | `build.outDir` / `assetsDir` / `emptyOutDir` / `copyPublicDir`   | 构建产物的输出目录与静态资源管理         |
| 04-assetsInlineLimit资源内联 | `build.assetsInlineLimit`                                        | 控制资源内联为 base64 的阈值             |
| 05-CSS构建选项               | `build.cssCodeSplit` / `cssTarget` / `cssMinify`                 | CSS 代码拆分、目标浏览器、压缩方式       |
| 06-sourcemap源码映射         | `build.sourcemap`                                                | source map 文件生成方式                  |
| 07-rolldownOptions底层配置   | `build.rolldownOptions` / `dynamicImportVarsOptions`             | 直接自定义底层 Rolldown 打包行为         |
| 08-lib库模式构建             | `build.lib`                                                      | 以库的形式构建，配置入口、格式、文件名   |
| 09-license许可证             | `build.license`                                                  | 生成打包依赖的许可证信息文件             |
| 10-manifest清单文件          | `build.manifest` / `ssrManifest`                                 | 生成资源映射清单，用于后端集成或 SSR     |
| 11-ssr服务端渲染构建         | `build.ssr` / `emitAssets` / `ssrEmitAssets`                     | SSR 构建配置与静态资源输出控制           |
| 12-minify代码压缩            | `build.minify` / `terserOptions`                                 | 代码压缩方式与 Terser 选项               |
| 13-构建输出控制              | `build.write` / `reportCompressedSize` / `chunkSizeWarningLimit` | 控制写入磁盘、压缩报告、chunk 大小警告   |
| 14-watch监听构建             | `build.watch`                                                    | 启用构建监听模式，文件变更时自动重新构建 |

## 运行方式

每个 demo 都包含 `package.json`，进入对应目录执行 `npm install && npm run dev` 即可运行。

## 详细 API

### build.target

- **类型：** `string | string[]`
- **默认：** `'baseline-widely-available'`

最终软件包的浏览器兼容性目标。默认值是 Vite 的一个特殊值 `'baseline-widely-available'`，该值针对的是包含在 2026 年 1 月 1 日广泛可用的 Baseline 中的浏览器。具体来说，它是 `['chrome111', 'edge111', 'firefox114', 'safari16.4']`。

另一个特殊值是 `'esnext'` —— 即假设有原生动态导入支持，并只执行最低限度的转译。

转换过程将会由 Oxc Transformer 执行，并且此值应该是一个合法的 Oxc Transformer 目标选项。自定义目标也可以是一个 ES 版本（例如：`es2015`）、一个浏览器版本（例如：`chrome58`）或是多个目标组成的一个数组。

注意：如果代码包含不能被 Oxc 安全地编译的特性，那么构建将会输出警告。

### build.modulePreload

- **类型：** `boolean | { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }`
- **默认值：** `{ polyfill: true }`

默认情况下，一个模块预加载 polyfill 会被自动注入。该 polyfill 会自动注入到每个 index.html 入口的代理模块中。如果构建通过 `build.rolldownOptions.input` 被配置为了使用非 HTML 入口的形式，那么必须要在你的自定义入口中手动引入该 polyfill：

```js
import "vite/modulepreload-polyfill";
```

此 polyfill 可以通过 `{ polyfill: false }` 来禁用。注意此 polyfill 不适用于 Library 模式。

`resolveDependencies` 函数支持对依赖项列表及其路径进行细粒度控制：

```ts
type ResolveModulePreloadDependenciesFn = (
  url: string,
  deps: string[],
  context: {
    hostId: string;
    hostType: "html" | "js";
  },
) => string[];
```

### build.polyfillModulePreload

- **类型：** `boolean`
- **默认：** `true`
- **已废弃** 请使用 `build.modulePreload.polyfill` 替代

### build.outDir

- **类型：** `string`
- **默认：** `dist`

指定输出路径（相对于项目根目录）。

### build.assetsDir

- **类型：** `string`
- **默认：** `assets`

指定生成静态资源的存放路径（相对于 `build.outDir`）。在库模式下不能使用。

### build.assetsInlineLimit

- **类型：** `number | ((filePath: string, content: Buffer) => boolean | undefined)`
- **默认：** `4096` (4 KiB)

小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。

如果传入了一个回调函数，可以通过返回一个布尔值来选择是否加入。Git LFS 占位符会自动排除在内联之外。

注意：如果指定了 `build.lib`，那么 `build.assetsInlineLimit` 将被忽略。

### build.cssCodeSplit

- **类型：** `boolean`
- **默认：** `true`

启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。

注意：如果指定了 `build.lib`，`build.cssCodeSplit` 会默认为 `false`。

### build.cssTarget

- **类型：** `string | string[]`
- **默认值：** 与 `build.target` 一致

此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。应只在针对非主流浏览器时使用。

### build.cssMinify

- **类型：** `boolean | 'lightningcss' | 'esbuild'`
- **默认：** `'lightningcss'`，但如果客户端构建时禁用了 `build.minify`，则为 `false`

此选项允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 `build.minify`。Vite 默认使用 Lightning CSS 来压缩 CSS。

### build.sourcemap

- **类型：** `boolean | 'inline' | 'hidden'`
- **默认：** `false`

构建后是否生成 source map 文件。如果为 `true`，将会创建一个独立的 source map 文件。如果为 `'inline'`，source map 将作为一个 data URI 附加在输出文件中。`'hidden'` 的工作原理与 `true` 相似，只是 bundle 文件中相应的注释将不被保留。

### build.rolldownOptions

- **类型：** `RolldownOptions`

直接自定义底层 Rolldown 包。这与从 Rolldown 配置文件导出的选项相同，并将与 Vite 的内部 Rolldown 选项合并。

### build.rollupOptions

- **类型：** `RolldownOptions`
- **已弃用** — 请使用 `build.rolldownOptions` 选项代替。

### build.dynamicImportVarsOptions

- **类型：** `{ include?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[] }`

是否转换带有变量的动态导入。

### build.lib

- **类型：** `{ entry: string | string[] | { [entryAlias: string]: string }, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string | ((format: ModuleFormat, entryName: string) => string), cssFileName?: string }`

以库的形式构建。`entry` 是必需的，因为库不能使用 HTML 作为入口。`name` 是暴露的全局变量，当 `formats` 包括 `'umd'` 或 `'iife'` 时必须使用。

### build.license

- **类型：** `boolean | { fileName?: string }`
- **默认：** `false`

当设置为 `true` 时，构建过程将生成一个 `.vite/license.md` 文件，其中包含所有打包依赖项的许可证信息。

### build.manifest

- **类型：** `boolean | string`
- **默认：** `false`

是否生成一个 manifest 文件，包含了没有被 hash 过的资源文件名和 hash 后版本的映射。

### build.ssrManifest

- **类型：** `boolean | string`
- **默认值：** `false`

是否生成 SSR 的 manifest 文件，以确定生产中的样式链接与资源预加载指令。

### build.ssr

- **类型：** `boolean | string`
- **默认值：** `false`

生成面向 SSR 的构建。

### build.emitAssets

- **类型：** `boolean`
- **默认：** `false`

在非客户端的构建过程中，允许框架强制输出静态资源。

### build.ssrEmitAssets

- **类型：** `boolean`
- **默认：** `false`
- **已弃用** — 将被 `build.emitAssets` 替代。

在 SSR 构建期间，允许框架强制输出静态资源。

### build.minify

- **类型：** `boolean | 'oxc' | 'terser' | 'esbuild'`
- **默认：** 客户端构建默认为 `'oxc'`，SSR 构建默认为 `false`

设置为 `false` 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认使用 Oxc Minifier。

`build.minify: 'esbuild'` 已弃用，将在未来版本中移除。

### build.terserOptions

- **类型：** `TerserOptions`

传递给 Terser 的更多 minify 选项。可以传递 `maxWorkers: number` 选项来指定最大的工作线程数。

### build.write

- **类型：** `boolean`
- **默认：** `true`

设置为 `false` 来禁用将构建后的文件写入磁盘。

### build.emptyOutDir

- **类型：** `boolean`
- **默认：** 若 outDir 在 root 目录下，则为 `true`

默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。

### build.copyPublicDir

- **类型：** `boolean`
- **默认：** `true`

默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。

### build.reportCompressedSize

- **类型：** `boolean`
- **默认：** `true`

启用/禁用 gzip 压缩大小报告。

### build.chunkSizeWarningLimit

- **类型：** `number`
- **默认：** `500`

规定触发警告的 chunk 大小（以 kB 为单位）。

### build.watch

- **类型：** `WatcherOptions | null`
- **默认：** `null`

设置为 `{}` 则会启用 rollup 的监听器。
