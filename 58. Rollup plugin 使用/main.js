// __APP_VERSION__ 会在构建时被插件替换成 "1.0.0"
const version = __APP_VERSION__

document.getElementById('out').textContent = `App Version: ${version}`
