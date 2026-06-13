// forwardConsole：在开发期间将浏览器运行时事件转发到 Vite 服务器控制台
//
// 类型：boolean | { unhandledErrors?: boolean, logLevels?: ('error' | 'warn' | 'info' | 'log' | 'debug')[] }
// 默认：自动（当基于 @vercel/detect-agent 检测到 AI 编码代理时为 true，否则为 false）
//
// true：启用转发未处理的错误以及 console.error / console.warn 日志
// unhandledErrors：控制是否转发未捕获的异常和未处理的 Promise 拒绝
// logLevels：控制转发哪些 console.* 调用
//
// 当未处理的错误被转发时，它们将以增强格式记录在服务器终端中，
// 包含源码位置和代码上下文。
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // ========== forwardConsole 配置 ==========

    // 默认：自动检测 AI 编码代理时启用
    // forwardConsole: false,

    // 简写：启用转发（包含未处理错误 + error/warn 日志）
    // forwardConsole: true,

    // 细粒度控制
    forwardConsole: {
      // 转发未捕获的异常和未处理的 Promise 拒绝
      unhandledErrors: true,

      // 控制转发哪些 console.* 调用
      // 可选值：'error' | 'warn' | 'info' | 'log' | 'debug'
      logLevels: ["warn", "error"],
    },

    // ========== 转发效果示例 ==========
    //
    // 当未处理的错误被转发时，终端中会显示增强格式的错误信息：
    //
    // 1:18:38 AM [vite] (client) [Unhandled error] Error: this is test error
    //  > testError src/main.ts:20:8
    //      18|
    //      19| function testError() {
    //      20|   throw new Error('this is test error')
    //        |        ^
    //      21| }
    //      22|
    //  > HTMLButtonElement.<anonymous> src/main.ts:6:2
    //
    // 这对于在不打开浏览器开发者工具的情况下，
    // 在终端中快速定位错误非常有用。
  },
});
