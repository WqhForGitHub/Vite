// build.rolldownOptions / dynamicImportVarsOptions
// 直接自定义底层 Rolldown 打包行为
//
// build.rolldownOptions
//   类型：RolldownOptions
//   直接自定义底层 Rolldown 包。这与从 Rolldown 配置文件导出的选项相同，
//   并将与 Vite 的内部 Rolldown 选项合并。
//   更多详情请参阅 Rolldown 选项文档。
//
// build.rollupOptions（已弃用）
//   类型：RolldownOptions
//   此选项是 build.rolldownOptions 选项的别名。
//   请使用 build.rolldownOptions 选项代替。
//
// build.dynamicImportVarsOptions
//   类型：{ include?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[] }
//   是否转换带有变量的动态导入。

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // ========== rolldownOptions 配置 ==========

    rolldownOptions: {
      // 自定义入口
      input: {
        main: "index.html",
        // 多入口：支持多个 HTML 页面
        // about: 'about.html',
        // contact: 'contact.html',
      },

      // 输出配置
      output: {
        // 入口文件命名
        entryFileNames: "js/[name]-[hash].js",

        // chunk 文件命名
        chunkFileNames: "js/[name]-[hash].js",

        // 静态资源文件命名
        assetFileNames: "[ext]/[name]-[hash].[ext]",

        // 自定义 chunk 分割策略
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'
        //   }
        // },

        // 在文件顶部插入横幅注释
        // postBanner: '/* See licenses at https://example.com/license.md */',
      },

      // 外部化依赖（不打包进 bundle）
      // external: ['lodash', 'react'],

      // 全局变量定义（用于 UMD/IIFE 格式的外部依赖）
      // globals: {
      //   lodash: '_',
      //   react: 'React',
      // },
    },

    // ========== dynamicImportVarsOptions 配置 ==========

    // 控制是否转换带有变量的动态导入
    dynamicImportVarsOptions: {
      // 包含的文件范围
      // include: ['src/**/*.ts'],

      // 排除的文件范围
      exclude: ["node_modules/**"],
    },

    // ========== 已废弃选项 ==========

    // build.rollupOptions 是 build.rolldownOptions 的别名
    // rollupOptions: { ... },  // ❌ 已弃用
    // rolldownOptions: { ... },  // ✅ 新写法

    // ========== 实际场景示例 ==========

    // 场景一：多页面应用
    // rolldownOptions: {
    //   input: {
    //     index: 'index.html',
    //     admin: 'admin.html',
    //     mobile: 'mobile.html',
    //   },
    // },

    // 场景二：优化 chunk 分割
    // rolldownOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         // 将 node_modules 中的不同包分割到不同的 chunk
    //         if (id.includes('react')) return 'react-vendor'
    //         if (id.includes('lodash')) return 'lodash-vendor'
    //         return 'vendor'
    //       }
    //     },
    //   },
    // },

    // 场景三：配合 license 选项插入许可证链接
    // rolldownOptions: {
    //   output: {
    //     postBanner: '/* See licenses of bundled dependencies at https://example.com/license.md */',
    //   },
    // },
  },
});
