// 同时引导 Vue 与 React 两个独立子应用
import { createApp } from 'vue'
import VueApp from './VueApp.vue'

import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactApp from './ReactApp.jsx'

// 挂载 Vue
createApp(VueApp).mount('#vue-app')

// 挂载 React
createRoot(document.getElementById('react-app')).render(<ReactApp />)
