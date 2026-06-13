import { createApp, h } from 'vue'
import { capitalize } from 'lodash-es'

createApp({
  render: () => h('p', `Hello ${capitalize('vite')} from CDN`),
}).mount('#app')
