// Vite 支持 ?init 后缀的 wasm 加载（推荐方式）
// 如果 add.wasm 不存在，先运行: npm run gen:wasm

import init from './add.wasm?init'

const out = document.querySelector('#out')

try {
  const instance = await init()
  // 我们生成的 wasm 导出 add 函数
  const r = instance.exports.add(2, 3)
  out.textContent = `add(2, 3) = ${r}`
  console.log('wasm exports:', instance.exports)
} catch (err) {
  out.textContent = '加载 wasm 失败：' + err.message + '\n请先执行 npm run gen:wasm 生成 add.wasm'
  console.error(err)
}
