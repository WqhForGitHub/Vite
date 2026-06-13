# 预览选项

除非另有说明，本节中的选项仅适用于预览。

## Demo 列表

```
05. 预览选项/
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
│   └── vite.config.ts              # open 预览服务器启动时自动打开浏览器
├── 05-proxy代理/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts              # proxy 自定义代理规则
└── 06-cors与headers/
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts              # cors 跨域配置与 headers 自定义响应头
```

| Demo                | 知识点                         | 说明                                         |
| ------------------- | ------------------------------ | -------------------------------------------- |
| 01-host与port配置   | `host` + `port` + `strictPort` | 监听 IP 地址、端口号指定、端口占用严格模式   |
| 02-allowedHosts安全 | `allowedHosts`                 | 允许响应的主机名白名单，防止 DNS 重绑定攻击  |
| 03-https配置        | `https`                        | TLS + HTTP/2 配置，自签名证书与自定义证书    |
| 04-open自动打开     | `open`                         | 启动时自动打开浏览器，指定路径与环境变量     |
| 05-proxy代理        | `proxy`                        | 字符串简写、带选项、正则匹配、WebSocket 代理 |
| 06-cors与headers    | `cors` + `headers`             | CORS 跨域配置，自定义服务器响应头            |

每个 demo 都包含 `package.json`，进入对应目录执行 `npm install && npm run preview` 即可运行。

---

## preview.host

- **类型**：`string | boolean`
- **默认**：`server.host`

为开发服务器指定 ip 地址。 设置为 `0.0.0.0` 或 `true` 会监听所有地址，包括局域网和公共地址。

还可以通过 CLI 进行设置，使用 `--host 0.0.0.0` 或 `--host`。

> 在某些情况下，可能响应的是其他服务器而不是 Vite。 查看 server.host 了解更多细节。

## preview.allowedHosts

- **类型**：`string[] | true`
- **默认**：`server.allowedHosts`

Vite 允许响应的主机名。

查看 server.allowedHosts 以获取更多详细信息。

## preview.port

- **类型**：`number`
- **默认**：`4173`

指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口，所以这可能不是最终监听的服务器端口。

## preview.strictPort

- **类型**：`boolean`
- **默认**：`server.strictPort`

设置为 `true` 时，如果端口已被使用，则直接退出，而不会再进行后续端口的尝试。

## preview.https

- **类型**：`https.ServerOptions`
- **默认**：`server.https`

启用 TLS + HTTP/2。

有关更多详细信息，请参阅 server.https。

## preview.open

- **类型**：`boolean | string`
- **默认**：`server.open`

开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量 `process.env.BROWSER`（例如 firefox）。欲了解更多细节，请参阅 open 包的源码。

`BROWSER` 和 `BROWSER_ARGS` 是两个特殊的环境变量，你可以在 .env 文件中设置它们用以配置本选项。查看 open 这个包 了解更多详情。

## preview.proxy

- **类型**：`Record<string, string | ProxyOptions>`
- **默认**：`server.proxy`

为开发服务器配置自定义代理规则。其值的结构为 `{ key: options }` 的对象。如果 key 以 `^` 开头，它将被识别为 RegExp，其中 configure 选项可用于访问代理实例。

基于 http-proxy-3 实现。

## preview.cors

- **类型**：`boolean | CorsOptions`
- **默认**：`server.cors`

为预览服务器配置 CORS。

请查看 server.cors 了解更多细节。

## preview.headers

- **类型**：`OutgoingHttpHeaders`

指明服务器返回的响应头。
