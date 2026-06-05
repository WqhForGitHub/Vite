// build.cssCodeSplit / cssTarget / cssMinify
// CSS 代码拆分、目标浏览器、压缩方式
//
// build.cssCodeSplit
//   类型：boolean
//   默认：true
//   启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS
//   将内联到异步 chunk 本身，并在其被加载时一并获取。
//   如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
//   注意：如果指定了 build.lib，cssCodeSplit 会默认为 false。
//
// build.cssTarget
//   类型：string | string[]
//   默认值：与 build.target 一致
//   此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，
//   此处的 target 并非是用于 JavaScript 转写目标。
//   应只在针对非主流浏览器时使用。
//   最直观的示例是当你要兼容安卓微信中的 webview 时，
//   它支持大多数现代 JavaScript 功能，但并不支持 CSS 中的
//   #RGBA 十六进制颜色符号。这种情况下，你需要将 cssTarget
//   设置为 chrome61，以防止 vite 将 rgba() 颜色转化为
//   #RGBA 十六进制符号的形式。
//
// build.cssMinify
//   类型：boolean | 'lightningcss' | 'esbuild'
//   默认：'lightningcss'，但如果客户端构建时禁用了 build.minify，则为 false
//   此选项允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify，
//   这样你就可以单独配置 JS 和 CSS 的最小压缩方式。
//   Vite 默认使用 Lightning CSS 来压缩 CSS。可以通过 css.lightningcss 进行配置。
//   将此选项设置为 'esbuild' 可以改用 esbuild 进行压缩。
//   当设置为 'esbuild' 时，必须安装 esbuild：npm add -D esbuild

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== cssCodeSplit 配置 ==========

    // 默认：启用 CSS 代码拆分
    // 异步 chunk 中的 CSS 会内联到 chunk 中，按需加载
    cssCodeSplit: true,

    // 禁用 CSS 代码拆分
    // 所有 CSS 合并为一个文件，适合小型应用或需要统一管理 CSS 的场景
    // cssCodeSplit: false,

    // ========== cssTarget 配置 ==========

    // 默认值与 build.target 一致
    // cssTarget: 'baseline-widely-available',

    // 针对安卓微信 webview（chrome61 内核）
    // 防止 rgba() 被转换为 #RGBA 十六进制符号
    cssTarget: "chrome61",

    // 也可以是多个目标
    // cssTarget: ['chrome61', 'safari11'],

    // ========== cssMinify 配置 ==========

    // 默认：使用 Lightning CSS 压缩（最快，现代方案）
    cssMinify: "lightningcss",

    // 使用 esbuild 压缩（需要安装 esbuild：npm add -D esbuild）
    // cssMinify: 'esbuild',

    // 禁用 CSS 压缩
    // 适合调试场景或不需要压缩的情况
    // cssMinify: false,

    // ========== 实际场景示例 ==========

    // 场景一：兼容微信小程序 webview
    // cssCodeSplit: true,
    // cssTarget: 'chrome61',
    // cssMinify: 'lightningcss',

    // 场景二：纯现代浏览器应用，最大化压缩
    // cssCodeSplit: true,
    // cssTarget: 'esnext',
    // cssMinify: 'lightningcss',

    // 场景三：库模式构建
    // 库模式下 cssCodeSplit 默认为 false
    // cssCodeSplit: false,
    // cssMinify: 'lightningcss',
  },
});
