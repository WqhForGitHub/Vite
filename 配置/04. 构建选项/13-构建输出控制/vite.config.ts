// build.write / reportCompressedSize / chunkSizeWarningLimit
// 控制写入磁盘、压缩报告、chunk 大小警告
//
// build.write
//   类型：boolean
//   默认：true
//   设置为 false 来禁用将构建后的文件写入磁盘。
//   这常用于编程式地调用 build() 在写入磁盘之前，
//   需要对构建后的文件进行进一步处理。
//
// build.reportCompressedSize
//   类型：boolean
//   默认：true
//   启用/禁用 gzip 压缩大小报告。
//   压缩大型输出文件可能会很慢，因此禁用该功能可能会
//   提高大型项目的构建性能。
//
// build.chunkSizeWarningLimit
//   类型：number
//   默认：500
//   规定触发警告的 chunk 大小（以 kB 为单位）。
//   它将与未压缩的 chunk 大小进行比较，
//   因为 JavaScript 大小本身与执行时间相关。

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== write 配置 ==========

    // 默认：构建后写入磁盘
    // write: true,

    // 禁用写入磁盘
    // 适用场景：编程式调用 build()，需要在内存中进一步处理
    // write: false,

    // 编程式使用示例：
    // const result = await build({ write: false })
    // result.output.forEach((chunk) => {
    //   // 在内存中处理每个 chunk
    //   console.log(chunk.fileName, chunk.type)
    // })

    write: true,

    // ========== reportCompressedSize 配置 ==========

    // 默认：构建完成后显示 gzip 压缩大小
    // reportCompressedSize: true,

    // 禁用 gzip 压缩大小报告
    // 大型项目压缩计算可能很慢，禁用可以提高构建速度
    reportCompressedSize: false,

    // ========== chunkSizeWarningLimit 配置 ==========

    // 默认：当 chunk 超过 500kB 时发出警告
    // chunkSizeWarningLimit: 500,

    // 提高警告阈值到 1000kB
    // chunkSizeWarningLimit: 1000,

    // 降低警告阈值到 200kB（更严格的包体积控制）
    chunkSizeWarningLimit: 200,

    // ========== 实际场景示例 ==========

    // 场景一：大型项目优化构建速度
    // reportCompressedSize: false,  // 禁用压缩大小计算
    // chunkSizeWarningLimit: 1500,  // 大项目允许更大的 chunk

    // 场景二：严格控制包体积
    // reportCompressedSize: true,    // 显示压缩大小
    // chunkSizeWarningLimit: 200,    // 较小的警告阈值

    // 场景三：编程式构建（如在 CI 或插件中）
    // write: false,
    // 然后通过代码处理构建产物
    // const { build } = await import('vite')
    // const result = await build({ write: false })
    // for (const chunk of result.output) {
    //   if (chunk.type === 'chunk') {
    //     // 自定义处理每个 chunk
    //   }
    // }
  },
});
