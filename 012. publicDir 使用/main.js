// 通过 import 引入的资源会被 Vite 处理（产物会带 hash）
import imgUrl from './src/assets/inside.svg'

document.getElementById('imported').src = imgUrl

console.log('public 资源 URL：', '/logo.svg（不会 hash）')
console.log('import 资源 URL：', imgUrl, '（会 hash）')
