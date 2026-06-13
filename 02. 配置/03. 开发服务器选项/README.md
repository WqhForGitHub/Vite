# 开发服务器选项

除非另有说明，本节中的选项仅适用于开发环境。

## Demo 列表

```
03. 开发服务器选项/
├── 01-host与port配置/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # host、port、strictPort 监听地址与端口配置
├── 02-allowedHosts安全/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # allowedHosts 允许响应的主机名
├── 03-https配置/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # https TLS + HTTP/2 配置
├── 04-open自动打开/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # open 开发服务器启动时自动打开浏览器
├── 05-proxy代理/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # proxy 自定义代理规则
├── 06-cors与headers/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # cors 跨域配置与 headers 自定义响应头
├── 07-hmr热更新/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # hmr 热模块替换连接配置
├── 08-forwardConsole转发/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # forwardConsole 浏览器运行时事件转发
├── 09-warmup与watch/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # warmup 预热与 watch 文件监听配置
├── 10-middlewareMode中间件/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # middlewareMode 中间件模式
├── 11-fs文件安全/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # fs.strict、fs.allow、fs.deny 文件访问安全
└── 12-origin与sourcemap/
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts              # origin 资源 origin 与 sourcemapIgnoreList 忽略列表
```

| Demo                    | 知识点                               | 说明                                                           |
| ----------------------- | ------------------------------------ | -------------------------------------------------------------- |
| 01-host与port配置       | `host` + `port` + `strictPort`       | 监听 IP 地址、端口号指定、端口占用严格模式                     |
| 02-allowedHosts安全     | `allowedHosts`                       | 允许响应的主机名白名单，防止 DNS 重绑定攻击                    |
| 03-https配置            | `https`                              | TLS + HTTP/2 配置，自签名证书与自定义证书                      |
| 04-open自动打开         | `open`                               | 启动时自动打开浏览器，指定路径与环境变量                       |
| 05-proxy代理            | `proxy`                              | 字符串简写、带选项、正则匹配、WebSocket 代理                   |
| 06-cors与headers        | `cors` + `headers`                   | CORS 跨域配置，自定义服务器响应头                              |
| 07-hmr热更新            | `hmr`                                | HMR WebSocket 配置，protocol/host/port/path/overlay/clientPort |
| 08-forwardConsole转发   | `forwardConsole`                     | 浏览器控制台日志与未处理错误转发到服务器终端                   |
| 09-warmup与watch        | `warmup` + `watch`                   | 文件预热缓存，文件系统监视器配置                               |
| 10-middlewareMode中间件 | `middlewareMode`                     | 以中间件模式创建 Vite 服务器，与 Express 等框架集成            |
| 11-fs文件安全           | `fs.strict` + `fs.allow` + `fs.deny` | 文件访问限制，允许/拒绝目录配置                                |
| 12-origin与sourcemap    | `origin` + `sourcemapIgnoreList`     | 开发调试阶段资源 origin，sourcemap 忽略列表                    |

每个 demo 都包含 `package.json`，进入对应目录执行 `npm install && npm run dev` 即可运行。

---

## server.host

- **类型**：`string | boolean`
- **默认**：`'localhost'`

指定服务器应该监听哪个 IP 地址。如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址。

也可以通过 CLI 使用 `--host 0.0.0.0` 或 `--host` 来设置。

> 在某些情况下，可能响应的是其他服务器而不是 Vite。
>
> 第一种情况是使用 localhost 时。Node.js 的 `dns.setDefaultResultOrder` 会改变 DNS 解析结果的地址排序方式，而浏览器可能会使用与 Vite 正在监听的地址不同的解析地址。Vite 会在两者不一致时打印出解析后的地址。
>
> 第二种情况是使用了通配主机地址（例如 `0.0.0.0`）。这是因为侦听非通配符主机的服务器优先于侦听通配符主机的服务器。

**在 WSL2 中通过 LAN 访问开发服务器**

当你在 WSL2 运行 Vite 时，仅设置 `host: true` 来从局域网访问服务器是不够的。请看 WSL 相关文档了解更多细节。

## server.allowedHosts

- **类型**：`string[] | true`
- **默认**：`[]`

Vite 允许响应的主机名。默认情况下，允许 localhost 及其下的所有 `.localhost` 域名和所有 IP 地址。使用 HTTPS 时，将跳过此检查。

如果设置的字符串以 `.` 开头，则允许该主机名本身（不带 `.`）以及该主机名下的所有子域名。例如，`.example.com` 将允许 `example.com`、`foo.example.com` 和 `foo.bar.example.com`。如果设置为 `true`，服务器将被允许响应任何主机的请求。

> **危险**：将 `server.allowedHosts` 设置为 `true` 允许任何网站通过 DNS 重绑定攻击向你的开发服务器发送请求，从而使它们能够下载你的源代码和内容。我们建议始终使用显式的允许主机列表。

## server.port

- **类型**：`number`
- **默认值**：`5173`

指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。

## server.strictPort

- **类型**：`boolean`

设为 `true` 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。

## server.https

- **类型**：`https.ServerOptions`

启用 TLS + HTTP/2。该值是传递给 `https.createServer()` 的 options 对象。

需要一个合法可用的证书。对基本使用的配置需求来说，你可以添加 `@vitejs/plugin-basic-ssl` 到项目插件中，它会自动创建和缓存一个自签名的证书。但我们推荐你创建和使用你自己的证书。

## server.open

- **类型**：`boolean | string`

开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量 `process.env.BROWSER`（例如 firefox）。你还可以设置 `process.env.BROWSER_ARGS` 来传递额外的参数（例如 `--incognito`）。

## server.proxy

- **类型**：`Record<string, string | ProxyOptions>`

为开发服务器配置自定义代理规则。期望接收一个 `{ key: options }` 对象。任何请求路径以 key 值开头的请求将被代理到对应的目标。如果 key 值以 `^` 开头，将被识别为 RegExp。`configure` 选项可用于访问 proxy 实例。如果请求匹配任何配置的代理规则，该请求将不会被 Vite 转换。

## server.cors

- **类型**：`boolean | CorsOptions`
- **默认**：`{ origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/ }`

为开发服务器配置 CORS。传递一个选项对象来调整行为，或设置为 `true` 来允许任何源。

## server.headers

- **类型**：`OutgoingHttpHeaders`

指定服务器响应的 header。

## server.hmr

- **类型**：`boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }`

禁用或配置 HMR 连接。

## server.forwardConsole

- **类型**：`boolean | { unhandledErrors?: boolean, logLevels?: ('error' | 'warn' | 'info' | 'log' | 'debug')[] }`
- **默认**：自动（当检测到 AI 编码代理时为 true，否则为 false）

在开发期间，将浏览器运行时事件转发到 Vite 服务器控制台。

## server.warmup

- **类型**：`{ clientFiles?: string[], ssrFiles?: string[] }`

提前转换和缓存文件以进行预热。可以在服务器启动时提高初始页面加载速度，并防止转换瀑布。

## server.watch

- **类型**：`object | null`

文件系统监视器选项传递给 chokidar。

## server.middlewareMode

- **类型**：`boolean`
- **默认值**：`false`

以中间件模式创建 Vite 服务器。

## server.fs.strict

- **类型**：`boolean`
- **默认**：`true`（自 Vite 2.7 起默认启用）

限制为工作区 root 路径以外的文件的访问。

## server.fs.allow

- **类型**：`string[]`

限制哪些文件可以通过 `/@fs/` 路径提供服务。

## server.fs.deny

- **类型**：`string[]`
- **默认**：`['.env', '.env.*', '*.{crt,pem}', '**/.git/**']`

用于限制 Vite 开发服务器提供敏感文件的黑名单。

## server.origin

- **类型**：`string`

用于定义开发调试阶段生成资源的 origin。

## server.sourcemapIgnoreList

- **类型**：`false | (sourcePath: string, sourcemapPath: string) => boolean`
- **默认**：`(sourcePath) => sourcePath.includes('node_modules')`

是否忽略服务器 sourcemap 中的源文件，用于填充 `x_google_ignoreList` source map 扩展。
