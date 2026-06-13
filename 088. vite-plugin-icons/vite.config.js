import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// unplugin-icons (vite-plugin-icons)
// 文档: https://github.com/unplugin/unplugin-icons
// 自动按需引入 100+ icon 集合（iconify），并生成 Vue/React 组件
export default defineConfig({
  plugins: [
    vue(),
    // 自动注册 i-mdi-home 这种前缀的组件
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'i', // <i-mdi-home />
        }),
      ],
    }),
    Icons({
      // 自动安装 iconify json 数据
      autoInstall: true,
      // 生成的组件类型
      compiler: 'vue3',
      // 默认样式注入
      scale: 1.2,
      defaultStyle: 'vertical-align: middle;',
    }),
  ],

  server: {
    port: 5188,
    open: true,
  },
})
