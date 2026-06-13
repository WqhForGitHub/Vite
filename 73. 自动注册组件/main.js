import components, { register } from 'virtual:components'

console.log('已注册组件:', Object.keys(components))
register(document.querySelector('#app'))
