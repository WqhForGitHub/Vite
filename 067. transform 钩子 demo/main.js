// __VERSION__ 在构建/dev 时会被插件替换为 "1.0.0"
const version = __VERSION__
document.querySelector('#ver').textContent = '当前版本: ' + version
console.log('version =', version)
