// PostCSS 配置文件
// Vite 会自动识别 postcss.config.js / postcss.config.cjs / .postcssrc.* 等
// 也可以直接写到 vite.config.js 的 css.postcss 字段中

import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: [
    // 允许 SCSS 风格的嵌套语法
    postcssNested(),

    // 让你能用未来的 CSS 语法（自定义媒体查询、嵌套、:has 等）
    // stage 0 ~ 4，越小越激进
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    }),

    // 自动添加浏览器前缀（基于 browserslist）
    autoprefixer(),
  ],
}
