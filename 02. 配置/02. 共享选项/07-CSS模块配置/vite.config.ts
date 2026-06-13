// CSS 配置：modules、preprocessorOptions、postcss、devSourcemap
//
// css.modules：配置 CSS Modules 的行为
// css.preprocessorOptions：传递给 CSS 预处理器的选项
// css.preprocessorOptions[ext].additionalData：为每段样式内容添加额外代码
// css.postcss：内联 PostCSS 配置或自定义配置路径
// css.devSourcemap：开发过程中是否启用 sourcemap
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    // ========== CSS Modules ==========
    modules: {
      // 作用域行为：'local'（默认，类名局部化）| 'global'（类名全局化）
      scopeBehaviour: "local",

      // 指定哪些路径的 CSS 文件使用全局模块
      globalModulePaths: [/global\.css$/],

      // 是否导出全局类名
      exportGlobals: true,

      // 生成作用域名称的方式
      // 字符串格式：[name]_[local]_[hash:5]
      // 函数格式：自定义生成逻辑
      generateScopedName: "[name]_[local]_[hash:5]",

      // 哈希前缀
      hashPrefix: "my-app",

      // 导出的类名风格
      // 'camelCase'：同时保留原始名和驼峰名
      // 'camelCaseOnly'：只保留驼峰名
      // 'dashes'：中划线转为驼峰，同时保留原始名
      // 'dashesOnly'：中划线转为驼峰，只保留驼峰名
      localsConvention: "camelCase",
    },

    // ========== 预处理器选项 ==========
    preprocessorOptions: {
      // SCSS/Sass 选项
      scss: {
        // 为每段 SCSS 内容添加额外代码（如全局变量、mixin）
        // 注意：如果添加实际样式而不仅是变量，样式会在最终产物中重复
        additionalData: `$injectedColor: orange;\n@import "@/styles/mixins";`,

        // Sass importers（需要安装 sass-embedded 以获得最佳性能）
        // importers: [],
      },

      // Less 选项
      less: {
        // Less 数学模式
        math: "parens-division",
      },

      // Stylus 选项（仅支持 define）
      // styl: {
      //   define: {
      //     $specialColor: new stylus.nodes.RGBA(51, 197, 255, 1),
      //   },
      // },
    },

    // ========== 预处理器最大工作线程 ==========
    // true：最多为 CPU 数量减 1
    // 0：在主线程中运行预处理器
    // 数字：指定最大线程数
    // preprocessorMaxWorkers: true,

    // ========== PostCSS ==========
    // 内联 PostCSS 配置（提供后将不搜索其他配置源）
    // postcss: {
    //   plugins: [
    //     // require('autoprefixer'),
    //   ],
    // },

    // 或者指定自定义 PostCSS 配置文件路径
    // postcss: './postcss.config.js',

    // ========== 开发环境 Sourcemap ==========
    // 默认 false，启用后可在开发时查看 CSS 原始源码位置
    devSourcemap: true,
  },
});
