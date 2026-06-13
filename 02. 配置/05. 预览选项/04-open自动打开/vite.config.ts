// open：预览服务器启动时自动在浏览器中打开应用程序
//
// 类型：boolean | string
// 默认值：继承 server.open
//
// - true：启动时自动打开默认浏览器
// - 字符串：将被用作 URL 的路径名
//
// 环境变量：
// - process.env.BROWSER：指定浏览器（如 'firefox'）
// - process.env.BROWSER_ARGS：传递额外参数（如 '--incognito'）
// 这两个环境变量可以放在 .env 文件中设置
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    // ========== open 配置 ==========

    // 启动时自动打开默认浏览器
    open: true,

    // 打开时跳转到指定路径
    // open: '/docs/index.html',

    // 不自动打开浏览器
    // open: false,

    // ========== 配合环境变量使用 ==========
    //
    // 在 .env 文件中设置：
    //   BROWSER=firefox          # 使用 Firefox 打开
    //   BROWSER_ARGS=--private   # 传递额外参数
    //
    // 或者在命令行中：
    //   BROWSER=firefox npm run preview
  },
})
