// origin 与 sourcemapIgnoreList：资源 origin 与 sourcemap 忽略列表
//
// origin：用于定义开发调试阶段生成资源的 origin
//   类型：string
//   在某些场景下，开发服务器生成的资源 URL 需要包含完整的 origin
//
// sourcemapIgnoreList：是否忽略服务器 sourcemap 中的源文件
//   类型：false | (sourcePath: string, sourcemapPath: string) => boolean
//   默认：(sourcePath) => sourcePath.includes('node_modules')
//   用于填充 x_google_ignoreList source map 扩展
//
// server.sourcemapIgnoreList 等价于 build.rolldownOptions.output.sourcemapIgnoreList
// 区别：rollup 函数使用相对路径调用 sourcePath，
// 而 server.sourcemapIgnoreList 使用绝对路径调用
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // ========== origin 配置 ==========

    // 用于定义开发调试阶段生成资源的 origin
    // 当你的开发服务器在反向代理后面运行时，
    // 可能需要设置 origin 以确保生成的资源 URL 是正确的
    origin: 'http://127.0.0.1:8080',

    // ========== sourcemapIgnoreList 配置 ==========

    // 默认值：排除所有包含 node_modules 的路径
    // 这是默认行为，将把所有路径中含有 node_modules 的文件添加到忽略列表中
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return sourcePath.includes('node_modules')
    },

    // 禁用忽略行为（不忽略任何源文件）
    // sourcemapIgnoreList: false,

    // 自定义忽略规则
    // sourcemapIgnoreList(sourcePath, sourcemapPath) {
    //   // 忽略 node_modules 和特定目录
    //   return (
    //     sourcePath.includes('node_modules') ||
    //     sourcePath.includes('vendor') ||
    //     sourcePath.includes('generated')
    //   )
    // },

    // ========== 注意事项 ==========
    //
    // 需要单独设置 server.sourcemapIgnoreList 和
    // build.rolldownOptions.output.sourcemapIgnoreList
    //
    // server.sourcemapIgnoreList 是仅适用于服务端的配置，
    // 并不从定义好的 rollup 选项中获得其默认值
  },
})
