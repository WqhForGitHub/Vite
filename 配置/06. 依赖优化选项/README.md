# 依赖优化选项

相关内容：[依赖预构建](https://cn.vite.dev/guide/dep-pre-bundling)

除非另有说明，本节中的选项仅适用于依赖优化器，该优化器仅在开发环境中使用。

## Demo 列表

```
06. 依赖优化选项/
├── 01-entries自定义入口/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # entries 自定义预构建入口
├── 02-exclude排除依赖/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # exclude 强制排除预构建依赖
├── 03-include强制预构建/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # include 强制预构建链接包 + glob 模式
├── 04-rolldownOptions构建选项/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # rolldownOptions 依赖优化 Rolldown 选项
├── 05-esbuildOptions弃用选项/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # esbuildOptions 已弃用，迁移至 rolldownOptions
├── 06-force与noDiscovery/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # force 强制预构建 + noDiscovery 禁用自动发现
├── 07-holdUntilCrawlEnd保持优化/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # holdUntilCrawlEnd 冷启动保持优化结果
└── 08-disabled与needsInterop/
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts              # disabled 已废弃选项 + needsInterop 强制 ESM 转换
```

| Demo                    | 知识点                                                  | 说明                                                       |
| ----------------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| 01-entries自定义入口    | `optimizeDeps.entries`                                  | 自定义预构建入口，glob 模式与 ! 忽略模式                   |
| 02-exclude排除依赖      | `optimizeDeps.exclude`                                  | 强制排除预构建依赖，CJS 排除注意事项                       |
| 03-include强制预构建    | `optimizeDeps.include`                                  | 强制预构建链接包，实验性 glob 模式，CJS 嵌套依赖           |
| 04-rolldownOptions构建选项 | `optimizeDeps.rolldownOptions`                       | 依赖优化过程中的 Rolldown 选项                             |
| 05-esbuildOptions弃用选项 | `optimizeDeps.esbuildOptions`                        | 已弃用的 esbuild 选项，迁移至 rolldownOptions              |
| 06-force与noDiscovery   | `optimizeDeps.force` + `optimizeDeps.noDiscovery`       | 强制预构建忽略缓存 + 禁用自动依赖发现                     |
| 07-holdUntilCrawlEnd保持优化 | `optimizeDeps.holdUntilCrawlEnd`               | 冷启动时保持优化结果直到所有静态导入检索完毕               |
| 08-disabled与needsInterop | `optimizeDeps.disabled` + `optimizeDeps.needsInterop` | 已废弃的 disabled 选项 + 实验性 needsInterop ESM 转换     |

每个 demo 都包含 `package.json`，进入对应目录执行 `npm install && npm run dev` 即可运行。

---

## optimizeDeps.entries

- **类型**：`string | string[]`
- **non-inherit**

默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了 node_modules、build.outDir、\_\_tests\_\_ 和 coverage）。如果指定了 build.rolldownOptions.input，Vite 将转而去抓取这些入口点。

如果这两者都不合你意，则可以使用此选项指定自定义条目——该值需要遵循 tinyglobby 模式，或者是相对于 Vite 项目根目录的匹配模式数组。当显式声明了 optimizeDeps.entries 时默认只有 node_modules 和 build.outDir 文件夹会被忽略。如果还需忽略其他文件夹，你可以在模式列表中使用以 ! 为前缀的、用来匹配忽略项的模式。对于明确包含字符串 node_modules 的模式，不会忽略 node_modules。

## optimizeDeps.exclude

- **类型**：`string[]`
- **non-inherit**

在预构建中强制排除的依赖项。

> CommonJS 的依赖不应该排除在优化外。如果一个 ESM 依赖被排除在优化外，但是却有一个嵌套的 CommonJS 依赖，则应该为该 CommonJS 依赖添加 optimizeDeps.include。

## optimizeDeps.include

- **类型**：`string[]`
- **non-inherit**

默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。

> 实验性：如果你使用的是一个有很多深层导入的库，你也可以指定一个尾部的 glob 模式来一次性地预构建所有深层导入。这将避免在使用新的深层导入时不断地预构建。

## optimizeDeps.rolldownOptions

- **类型**：`Omit<RolldownOptions, 'input' | 'logLevel' | 'output'> & { output?: Omit<RolldownOutputOptions, 'format' | 'sourcemap' | 'dir' | 'banner'> }`
- **non-inherit**

在依赖扫描和优化过程中传递给 Rolldown 的选项。某些选项进行了省略，因为修改它们与 Vite 的优化方案不兼容。plugins 与 Vite 的 dep 插件合并。

## optimizeDeps.esbuildOptions

- **类型**：`Omit<EsbuildBuildOptions, 'bundle' | 'entryPoints' | 'external' | 'write' | 'watch' | 'outdir' | 'outfile' | 'outbase' | 'outExtension' | 'metafile'>`
- **non-inherit**
- **已弃用**：此选项在内部被转换为 optimizeDeps.rolldownOptions。请使用 optimizeDeps.rolldownOptions 代替。

## optimizeDeps.force

- **类型**：`boolean`
- **non-inherit**

设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。

## optimizeDeps.noDiscovery

- **类型**：`boolean`
- **默认**：`false`
- **non-inherit**

设置为 true 时，自动依赖项发现将被禁用，并且仅优化 optimizeDeps.include 中列出的依赖项。在开发过程中，仅 CJS 依赖项必须存在于 optimizeDeps.include 中。

## optimizeDeps.holdUntilCrawlEnd

- **类型**：`boolean`
- **默认**：`true`
- **non-inherit**
- **实验性**

当该功能被启用时，系统会在冷启动时保持第一个优化的依赖结果，直到所有的静态导入都被检索完毕。这样可以避免因为发现新的依赖项而触发新的公共 chunk 生成，从而需要刷新整个页面。如果通过扫描和在 include 中明确定义的方式能找到所有的依赖项，那么最好关闭这个功能，这样浏览器可以并行处理更多的请求。

## optimizeDeps.disabled

- **类型**：`boolean | 'build' | 'dev'`
- **默认**：`'build'`
- **non-inherit**
- **已废弃**

此选项已被弃用。从 Vite 5.1 版本开始，构建过程中对依赖项的预打包已经被移除。如果你想完全禁用优化器，可以设置 optimizeDeps.noDiscovery: true 来禁止自动发现依赖项，并保持 optimizeDeps.include 未定义或为空。

## optimizeDeps.needsInterop

- **类型**：`string[]`
- **non-inherit**
- **实验性**

当导入这些依赖项时，会强制 ESM 转换。Vite 能够正确检测到依赖项是否需要转换处理（interop），因此通常不需要使用此选项。然而，不同的依赖项组合可能导致其中一些包以不同方式预构建。将这些包添加到 needsInterop 中可以通过避免重新加载整个页面来加快冷启动速度。如果某个依赖项符合此情况，Vite 将抛出警告，建议你在配置中添加该包名。
