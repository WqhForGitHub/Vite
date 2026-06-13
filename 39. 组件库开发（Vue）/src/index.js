import MyButton from './MyButton.vue'
import MyCard from './MyCard.vue'

// 单个组件具名导出
export { MyButton, MyCard }

// 整体安装：app.use(MyVueLib)
const components = { MyButton, MyCard }
export default {
  install(app) {
    for (const [name, comp] of Object.entries(components)) {
      app.component(name, comp)
    }
  },
}
