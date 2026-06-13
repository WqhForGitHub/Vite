function deepCall() {
  // 故意抛错，构建后能通过 sourcemap 定位到原始文件
  throw new Error('Source map 测试错误')
}

document.getElementById('trigger').onclick = () => {
  deepCall()
}
