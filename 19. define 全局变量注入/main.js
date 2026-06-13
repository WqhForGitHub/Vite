import './style.css'

// 这些变量在 vite.config.js 的 define 中定义
// 编译期会被原地替换成字面量，因此不能在源码运行时动态修改
const info = {
  appName: __APP_NAME__,
  version: __APP_VERSION__,
  buildTime: __BUILD_TIME__,
  config: __APP_CONFIG__,
  isDev: __DEV__,
  maxCount: __MAX_COUNT__,
}

console.log('注入的全局变量：', info)

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>${info.appName}</h1>
    <ul>
      <li>版本：${info.version}</li>
      <li>构建时间：${info.buildTime}</li>
      <li>是否开发环境：${info.isDev}</li>
      <li>最大计数：${info.maxCount}</li>
      <li>API 地址：${info.config.api}</li>
      <li>超时：${info.config.timeout} ms</li>
    </ul>
    <p>打开控制台查看完整对象，或运行 <code>npm run build</code> 后查看 dist 中代码已被替换。</p>
  </div>
`
