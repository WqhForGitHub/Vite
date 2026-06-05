// build.manifest / ssrManifest
// 资源映射清单文件
//
// build.manifest
//   类型：boolean | string
//   默认：false
//   是否生成一个 manifest 文件，包含了没有被 hash 过的资源文件名
//   和 hash 后版本的映射，然后服务器框架可使用该映射来呈现
//   正确的资源引入链接。
//   当值为字符串时，将用作相对于 build.outDir 的 manifest 文件路径。
//   设置为 true 时，路径将是 .vite/manifest.json。
//
//   如果您正在编写插件，并且需要在构建过程中检查每个输出块或资源的
//   CSS 和静态资源，您也可以使用 viteMetadata 构建输出元数据 API。
//
// build.ssrManifest
//   类型：boolean | string
//   默认值：false
//   是否生成 SSR 的 manifest 文件，以确定生产中的样式链接
//   与资源预加载指令。
//   当值为字符串时，将用作相对于 build.outDir 的 manifest 文件路径。
//   设置为 true 时，路径将是 .vite/ssr-manifest.json。

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== manifest 配置 ==========

    // 默认：不生成 manifest 文件
    // manifest: false,

    // 生成 manifest 到 .vite/manifest.json
    // 用于后端集成场景，服务器可以根据 manifest 动态引入正确的资源
    manifest: true,

    // 自定义 manifest 文件路径（相对于 outDir）
    // manifest: 'assets/manifest.json',

    // ========== ssrManifest 配置 ==========

    // 默认：不生成 SSR manifest
    // ssrManifest: false,

    // 生成 SSR manifest 到 .vite/ssr-manifest.json
    // 用于确定生产环境中的样式链接与资源预加载指令
    // ssrManifest: true,

    // 自定义 SSR manifest 文件路径（相对于 outDir）
    // ssrManifest: 'ssr-manifest.json',

    // ========== 实际场景示例 ==========

    // 场景一：与后端框架集成（如 Django、Laravel、Express）
    // 后端读取 manifest.json 来获取带 hash 的资源文件名
    // manifest: true,
    // 构建后 .vite/manifest.json 内容示例：
    // {
    //   "main.js": {
    //     "file": "main-abc123.js",
    //     "css": ["main-abc123.css"],
    //     "imports": ["vendor-def456.js"]
    //   }
    // }

    // 场景二：SSR 应用同时生成两个 manifest
    // manifest: true,
    // ssrManifest: true,

    // 场景三：自定义 manifest 路径，方便后端读取
    // manifest: 'static/manifest.json',
    // ssrManifest: 'static/ssr-manifest.json',
  },
});
