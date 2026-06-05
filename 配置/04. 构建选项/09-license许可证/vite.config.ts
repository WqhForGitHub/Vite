// build.license：生成打包依赖的许可证信息文件
//
// 类型：boolean | { fileName?: string }
// 默认：false
//
// 当设置为 true 时，构建过程将生成一个 .vite/license.md 文件，
// 其中包含所有打包依赖项的许可证信息。
//
// 如果传入了 fileName 参数，它将被用作相对于 outDir 的许可证文件名。
// 如果文件名以 .json 结尾，则会生成原始的 JSON 元数据，
// 可用于进一步处理。
//
// JSON 输出示例：
// [
//   {
//     "name": "dep-1",
//     "version": "1.2.3",
//     "identifier": "CC0-1.0",
//     "text": "CC0 1.0 Universal\n\n..."
//   }
// ]
//
// TIP: 如果想在构建的代码中引用许可证文件，可以使用
// build.rolldownOptions.output.postBanner 在文件顶部插入注释。

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== license 基本配置 ==========

    // 默认：不生成许可证文件
    // license: false,

    // 生成许可证文件到 .vite/license.md
    license: true,

    // 自定义许可证文件名（相对于 outDir）
    // license: { fileName: 'licenses.md' },

    // 生成 JSON 格式的许可证元数据
    // license: { fileName: 'licenses.json' },

    // ========== 配合 postBanner 插入许可证链接 ==========

    // 在构建产物的文件顶部插入注释，指向许可证文件
    rolldownOptions: {
      output: {
        postBanner:
          '/* See licenses of bundled dependencies at https://example.com/license.md */',
      },
    },

    // ========== 实际场景示例 ==========

    // 场景一：开源项目需要展示所有依赖的许可证
    // license: { fileName: 'THIRD_PARTY_LICENSES.md' },

    // 场景二：需要程序化处理许可证数据
    // license: { fileName: 'licenses.json' },
    // 然后可以在 CI 中检查是否有不兼容的许可证

    // 场景三：在构建产物中嵌入许可证引用
    // license: true,
    // rolldownOptions: {
    //   output: {
    //     postBanner: '/* Licenses: https://myapp.com/licenses.md */',
    //   },
    // },
  },
})
