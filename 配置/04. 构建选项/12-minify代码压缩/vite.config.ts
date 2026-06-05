// build.minify / terserOptions
// 代码压缩配置
//
// build.minify
//   类型：boolean | 'oxc' | 'terser' | 'esbuild'
//   默认：客户端构建默认为 'oxc'，SSR 构建默认为 false
//
//   设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
//   默认使用 Oxc Minifier，它比 terser 快 30~90 倍，
//   但压缩率仅差 0.5~2%。
//
//   build.minify: 'esbuild' 已弃用，将在未来版本中移除。
//
//   注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，
//   因为会移除掉 pure 标注，导致破坏 tree-shaking。
//
//   当设置为 'esbuild' 或 'terser' 时，必须分别安装：
//     npm add -D esbuild
//     npm add -D terser
//
// build.terserOptions
//   类型：TerserOptions
//   传递给 Terser 的更多 minify 选项。
//   此外，你还可以传递一个 maxWorkers: number 选项来指定最大的工作线程数。
//   默认为 CPU 核心数减 1。

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== minify 配置 ==========

    // 默认：使用 Oxc Minifier（最快，推荐）
    minify: 'oxc',

    // 使用 Terser 压缩（压缩率最高，但速度最慢）
    // 需要安装：npm add -D terser
    // minify: 'terser',

    // 使用 esbuild 压缩（已弃用，将在未来版本移除）
    // 需要安装：npm add -D esbuild
    // minify: 'esbuild',  // ❌ 已弃用

    // 禁用压缩（调试场景或 SSR 构建）
    // minify: false,

    // ========== terserOptions 配置 ==========

    // 当 minify 为 'terser' 时生效
    terserOptions: {
      // 压缩选项
      compress: {
        // 移除 console
        drop_console: false,

        // 移除 debugger
        drop_debugger: true,

        // 移除无用的代码
        dead_code: true,

        // 内联函数
        inline: 1,
      },

      // 格式化选项
      format: {
        // 移除注释
        comments: false,

        // 是否保留引号
        quote_style: 0,
      },

      // 保留的顶级名称（不混淆的变量名）
      // keep_classnames: false,
      // keep_fnames: false,

      // 最大工作线程数，默认为 CPU 核心数 - 1
      maxWorkers: 4,
    },

    // ========== 实际场景示例 ==========

    // 场景一：生产环境，追求最高压缩率
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //     pure_funcs: ['console.log'],  // 只移除 console.log
    //   },
    // },

    // 场景二：生产环境，追求最快构建速度
    // minify: 'oxc',  // 默认值，比 terser 快 30~90 倍

    // 场景三：调试构建，禁用压缩
    // minify: false,

    // 场景四：SSR 构建，默认禁用压缩
    // minify: false,  // SSR 默认值

    // 场景五：保留特定函数名（用于反射/装饰器场景）
    // minify: 'terser',
    // terserOptions: {
    //   keep_classnames: true,
    //   keep_fnames: true,
    // },
  },
})
