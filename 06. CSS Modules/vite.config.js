import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    modules: {
      // 自定义生成的类名规则
      // [name]：文件名（不含扩展名）
      // [local]：原始类名
      // [hash:base64:5]：5位 hash
      generateScopedName: '[name]__[local]___[hash:base64:5]',

      // 类名命名风格：camelCaseOnly | camelCase | dashes | dashesOnly
      localsConvention: 'camelCaseOnly',
    },
  },
})
