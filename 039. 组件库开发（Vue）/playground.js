// 开发预览：在 dev server 中直接使用源码组件
import { createApp, h } from 'vue'
import MyVueLib, { MyButton, MyCard } from './src/index.js'

const App = {
  setup() {
    return () =>
      h('div', { style: 'font-family:sans-serif;max-width:720px;margin:0 auto;padding:2rem' }, [
        h('h1', 'Vue 组件库 Playground'),
        h(
          MyCard,
          { title: '按钮示例' },
          {
            default: () => [
              h(MyButton, { type: 'primary' }, { default: () => 'Primary' }),
              ' ',
              h(MyButton, { type: 'danger', size: 'small' }, { default: () => 'Danger Small' }),
              ' ',
              h(MyButton, { type: 'ghost', size: 'large' }, { default: () => 'Ghost Large' }),
            ],
          },
        ),
      ])
  },
}

const app = createApp(App)
app.use(MyVueLib)
app.mount('#app')
