import { createSSRApp } from 'vue'
import App from './App.vue'

// 每次请求都创建一个新的 app 实例，避免跨请求状态污染
export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
