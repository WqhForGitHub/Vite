import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// 由 vite-plugin-pages 自动生成的虚拟模块
import routes from '~pages'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
