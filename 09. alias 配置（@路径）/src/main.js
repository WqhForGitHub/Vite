// 使用 @ 别名（指向 ./src）
import { sayHello } from '@/utils/hello.js'
// 使用 @utils 别名（指向 ./src/utils）
import { now } from '@utils/time.js'
// 使用 @ 引入 css
import '@/style.css'

const app = document.getElementById('app')
app.innerHTML = `
  <p>${sayHello('Vite')}</p>
  <p>当前时间：${now()}</p>
`
