# Worker 选项

除非另有说明，本节中的选项适用于所有开发、构建和预览。

## Demo 列表

```
08. Worker 选项/
├── 01-format输出类型/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # format Worker 打包输出格式
├── 02-plugins插件配置/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # plugins Worker 专用插件配置
└── 03-rolldownOptions底层配置/
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts              # rolldownOptions / rollupOptions Worker 底层打包配置
```

| Demo                       | 知识点                                            | 说明                                                |
| -------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| 01-format输出类型          | `worker.format`                                   | Worker 打包输出格式，支持 `es` 和 `iife` 两种格式   |
| 02-plugins插件配置         | `worker.plugins`                                  | Worker 专用 Vite 插件，构建阶段必须在此配置         |
| 03-rolldownOptions底层配置 | `worker.rolldownOptions` + `worker.rollupOptions` | Worker 底层 Rolldown 打包配置，rollupOptions 已弃用 |

每个 demo 都包含 `package.json`，进入对应目录执行 `npm install && npm run dev` 即可运行。

---

## worker.format

- **类型**：`'es' | 'iife'`
- **默认**：`'iife'`

Worker 打包时的输出类型。

## worker.plugins

- **类型**：`() => (Plugin | Plugin[])[]`

应用于 worker 打包的 Vite 插件。注意 `config.plugins` 仅会在开发（dev）阶段应用于 worker，若要配置在构建（build）阶段应用于 worker 的插件则应该在本选项这里配置。 该函数应返回新的插件实例，因为它们在并行的 rolldown worker 构建中使用。因此，在 `config` 钩子中修改 `config.worker` 选项将被忽略。

## worker.rolldownOptions

- **类型**：`RolldownOptions`

用于打包 worker 的 Rolldown 配置项。

## worker.rollupOptions

- **类型**：`RolldownOptions`
- **已弃用**

此选项是 `worker.rolldownOptions` 选项的别名。请使用 `worker.rolldownOptions` 选项代替。
