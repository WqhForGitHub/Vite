// build.outDir / assetsDir / emptyOutDir / copyPublicDir
// 构建产物的输出目录与静态资源管理
//
// build.outDir
//   类型：string
//   默认：dist
//   指定输出路径（相对于项目根目录）
//
// build.assetsDir
//   类型：string
//   默认：assets
//   指定生成静态资源的存放路径（相对于 build.outDir）
//   在库模式下不能使用
//
// build.emptyOutDir
//   类型：boolean
//   默认：若 outDir 在 root 目录下，则为 true
//   默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
//   若 outDir 在根目录之外则会抛出一个警告避免意外删除重要文件
//   也可以通过命令行参数 --emptyOutDir 来使用
//
// build.copyPublicDir
//   类型：boolean
//   默认：true
//   默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件
//   复制到 outDir 目录中。可以设置为 false 来禁用此行为

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // ========== outDir 配置 ==========

    // 默认输出到项目根目录下的 dist 文件夹
    // outDir: 'dist',

    // 自定义输出目录
    outDir: 'build',

    // 输出到项目根目录外的目录（需要注意 emptyOutDir 的行为）
    // outDir: '../output',

    // ========== assetsDir 配置 ==========

    // 默认：静态资源存放在 outDir/assets 目录下
    // assetsDir: 'assets',

    // 自定义静态资源目录名
    assetsDir: 'static',

    // 按资源类型组织（通过 Rolldown 配置更精细的控制）
    // assetsDir: 'resource',

    // ========== emptyOutDir 配置 ==========

    // 默认行为：如果 outDir 在 root 目录下，构建时自动清空
    // emptyOutDir: true,

    // 当 outDir 在项目根目录外时，默认会抛出警告
    // 设置为 true 可以强制清空（谨慎使用！）
    // emptyOutDir: true,

    // 设置为 false 可以保留 outDir 中已有的文件
    // 适用于增量构建或多个构建共用同一输出目录的场景
    emptyOutDir: false,

    // ========== copyPublicDir 配置 ==========

    // 默认：构建时将 public/ 目录中的文件复制到 outDir
    // copyPublicDir: true,

    // 禁用 public 目录文件的自动复制
    // 适用场景：public 目录中的文件由其他工具管理，或不需要复制
    copyPublicDir: true,

    // ========== 实际场景示例 ==========

    // 场景一：多环境构建，不同环境输出到不同目录
    // outDir: `dist/${process.env.NODE_ENV}`,

    // 场景二：静态资源按类型分类（需要配合 rolldownOptions）
    // outDir: 'dist',
    // assetsDir: 'assets',
    // rolldownOptions: {
    //   output: {
    //     entryFileNames: 'js/[name]-[hash].js',
    //     chunkFileNames: 'js/[name]-[hash].js',
    //     assetFileNames: '[ext]/[name]-[hash].[ext]',
    //   },
    // },

    // 场景三：SSR + 客户端共用输出目录，避免互相清空
    // outDir: 'dist/client',
    // emptyOutDir: true,
  },
})
