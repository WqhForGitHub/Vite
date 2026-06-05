// PostCSS 配置文件示例
// 当 css.postcss 未内联配置时，Vite 会自动搜索此文件
//
// 如果在 vite.config.ts 中提供了内联 css.postcss 配置，
// 则此文件不会被加载

export default {
  plugins: [
    // 自动添加浏览器前缀
    // require('autoprefixer'),

    // 使用 PostCSS 预设环境
    // require('postcss-preset-env')({ stage: 0 }),
  ],
}
