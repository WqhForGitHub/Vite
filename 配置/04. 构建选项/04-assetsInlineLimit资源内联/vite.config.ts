// build.assetsInlineLimit：控制资源内联为 base64 的阈值
//
// 类型：number | ((filePath: string, content: Buffer) => boolean | undefined)
// 默认：4096 (4 KiB)
//
// 小于此阈值的导入或引用资源将内联为 base64 编码，
// 以避免额外的 http 请求。设置为 0 可以完全禁用此项。
//
// 如果传入了一个回调函数，可以通过返回一个布尔值来选择是否加入。
// 如果没有返回任何内容，那么就会应用默认的逻辑。
//
// Git LFS 占位符会自动排除在内联之外，因为它们不包含其所表示的文件的内容。
//
// 注意：如果指定了 build.lib，那么 build.assetsInlineLimit 将被忽略，
// 无论文件大小或是否为 Git LFS 占位符，资源都会被内联。

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== assetsInlineLimit 数值配置 ==========

    // 默认值：4KB 以下的资源内联为 base64
    // assetsInlineLimit: 4096,

    // 提高阈值：8KB 以下的资源都内联
    // 适合小型应用，减少 HTTP 请求数
    assetsInlineLimit: 8192,

    // 降低阈值：仅内联 1KB 以下的资源
    // 适合大型应用，避免 base64 增大 JS bundle 体积
    // assetsInlineLimit: 1024,

    // 完全禁用内联：所有资源都生成独立文件
    // 适合需要浏览器缓存的场景
    // assetsInlineLimit: 0,

    // ========== assetsInlineLimit 回调函数 ==========

    // 使用回调函数进行更精细的控制
    // assetsInlineLimit: (filePath, content) => {
    //   // filePath: 资源文件的绝对路径
    //   // content: 资源文件的 Buffer 内容
    //
    //   // SVG 文件始终内联，无论大小
    //   if (filePath.endsWith('.svg')) {
    //     return true
    //   }
    //
    //   // 大型图片始终生成独立文件
    //   if (filePath.endsWith('.png') && content.length > 10000) {
    //     return false
    //   }
    //
    //   // 返回 undefined 使用默认逻辑（4KB 阈值）
    //   return undefined
    // },

    // ========== 实际场景示例 ==========

    // 场景一：所有小图标内联，大图片独立
    // assetsInlineLimit: (filePath) => {
    //   // 图标类文件始终内联
    //   if (/icon|favicon|logo/.test(filePath)) {
    //     return true
    //   }
    //   return undefined // 其他文件走默认逻辑
    // },

    // 场景二：禁止内联特定目录下的资源
    // assetsInlineLimit: (filePath) => {
    //   // assets/external/ 下的资源永远不内联
    //   if (filePath.includes('assets/external')) {
    //     return false
    //   }
    //   return undefined
    // },
  },
})
