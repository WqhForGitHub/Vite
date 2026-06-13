// 应用类型与日志配置：appType、html.cspNonce、logLevel、customLogger、clearScreen、plugins、devtools、future
//
// appType：应用类型（spa | mpa | custom）
// html.cspNonce：内容安全策略 nonce 值
// logLevel：控制台输出级别
// customLogger：自定义日志记录器
// clearScreen：是否清屏
// plugins：插件数组
// devtools：启用 DevTools 集成（实验性）
// future：启用未来的重大变更
import { defineConfig, createLogger } from "vite";

// ========== 自定义 Logger ==========
const logger = createLogger();
const originalWarn = logger.warn;

logger.warn = (msg, options) => {
  // 忽略空 CSS 文件的警告
  if (msg.includes("vite:css") && msg.includes(" is empty")) return;
  originalWarn(msg, options);
};

export default defineConfig({
  // ========== appType ==========
  // 'spa'（默认）：单页应用，包含 HTML 中间件和 SPA 回退
  // 'mpa'：多页应用，包含 HTML 中间件
  // 'custom'：定制化应用（SSR 和自定义 HTML 处理），不包含 HTML 中间件
  appType: "spa",

  // ========== html.cspNonce ==========
  // 内容安全策略（CSP）nonce 值
  // 设置后在生成的 script/style 标签上添加 nonce 属性
  // 同时生成一个带有 nonce 值的 meta 标签
  // html: {
  //   cspNonce: 'your-nonce-value-here',
  // },

  // ========== logLevel ==========
  // 控制台输出级别
  // 'info'（默认）：显示所有信息
  // 'warn'：只显示警告和错误
  // 'error'：只显示错误
  // 'silent'：静默模式
  logLevel: "info",

  // ========== customLogger ==========
  // 使用自定义 logger 记录消息
  customLogger: logger,

  // ========== clearScreen ==========
  // 是否在终端清屏
  // 设为 false 可避免清屏导致某些关键信息丢失
  // 命令行可通过 --clearScreen false 设置
  clearScreen: true,

  // ========== plugins ==========
  // 需要用到的插件数组
  // Falsy 虚值的插件将被忽略，插件数组将被扁平化
  // plugins: [
  //   vuePlugin(),
  //   reactPlugin(),
  //   process.env.NODE_ENV === 'development' && devPlugin(),  // 条件插件
  // ].filter(Boolean),
  plugins: [],

  // ========== devtools（实验性） ==========
  // 启用 DevTools 集成，用于可视化内部状态和构建分析
  // 需要安装 @vitejs/devtools 作为依赖
  // 目前仅在构建模式下受支持
  // devtools: true,

  // ========== future ==========
  // 启用未来的重大变更，为迁移到下一个主要版本做准备
  // 'warn'：使用即将弃用的行为时发出警告
  // undefined：不启用
  // future: {
  //   // 示例：当使用即将变更的 API 时发出警告
  //   // 'removePluginHookHandleHotUpdate': 'warn',
  // },
});
